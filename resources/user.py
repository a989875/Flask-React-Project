from hmac import compare_digest

from blocklist import BLOCKLIST
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                get_jwt, get_jwt_identity, jwt_required)
from flask_restful import Resource, reqparse
from models.user import UserModel
from werkzeug.security import check_password_hash, generate_password_hash

BLANK_ERROR = "'{}' cannot be blank."
ALREADY_EXISTS_ERROR = "A user with that {} already exists."
REGISTER_SUCCESSFULLY = "User Register successfully."
INVALID_CREDENTIALS = "Invalid credentials!"
USER_LOGGED_OUT = "User successfully logged out."
USER_NOT_FOUND = 'User Not Found'


class UserRegister(Resource):
    @classmethod
    def post(cls):

        user_parser = reqparse.RequestParser()
        user_parser.add_argument(
            "username", type=str, required=True, help=BLANK_ERROR.format("username")
        )
        user_parser.add_argument(
            "password", type=str, required=True, help=BLANK_ERROR.format("password")
        )

        user_parser.add_argument(
            "email", type=str, required=True, help=BLANK_ERROR.format("email")
        )
        user_parser.add_argument(
            "phone", type=str, required=True, help=BLANK_ERROR.format("phone")
        )

        data = user_parser.parse_args()

        if UserModel.find_by_username(data["username"]):
            return {"message": ALREADY_EXISTS_ERROR.format("username")}, 400

        if UserModel.find_by_email(data["email"]):
            return {"message": ALREADY_EXISTS_ERROR.format("email")}, 400

        if UserModel.find_by_phone(data["phone"]):
            return {"message": ALREADY_EXISTS_ERROR.format("phone")}, 400

        user = UserModel(**data)
        user.password = generate_password_hash(user.password)
        user.save_to_db()

        return {"message": REGISITER_SUCCESSFULLY}, 201


class UserLogin(Resource):
    @classmethod
    def post(cls):
        user_parser = reqparse.RequestParser()
        user_parser.add_argument(
            "username", type=str, required=True, help=BLANK_ERROR.format("username")
        )
        user_parser.add_argument(
            "password", type=str, required=True, help=BLANK_ERROR.format("password")
        )

        data = user_parser.parse_args()
        user = UserModel.find_by_username(data["username"])

        if user and check_password_hash(user.password, data.password):
            access_token = create_access_token(identity=user.username, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {"access_token": access_token, "refresh_token": refresh_token}, 200

        return {"message": INVALID_CREDENTIALS}, 401


class UserLogout(Resource):
    @classmethod
    @jwt_required()
    def post(cls):
        jti = get_jwt()["jti"]
        BLOCKLIST.add(jti)
        return {"message": USER_LOGGED_OUT}, 200


class TokenRefresh(Resource):
    @classmethod
    @jwt_required(refresh=True)
    def post(cls):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200


class UserProfile(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        username = get_jwt_identity()
        user = UserModel.find_by_username(username)
        if user:
            return user.json(), 200
        return {"message": USER_NOT_FOUND}, 404
