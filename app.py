from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
from flask_restful import Api

from blocklist import BLOCKLIST
from db import db
from resources.contact import Contact
from resources.item import Item, ItemCategory, ItemCategoryList, ItemList
from resources.order import SendOrder
from resources.user import (TokenRefresh, UserLogin, UserLogout, UserProfile,
                            UserRegister)

app = Flask(__name__,static_folder="client/build",static_url_path='')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
app.secret_key = "don"  
api = Api(app)
CORS(app)
db.init_app(app)


    

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/')
@cross_origin()
def server():
    return send_from_directory(app.static_folder,"index.html")

@app.errorhandler(404)
def not_found(error):
    return send_from_directory(app.static_folder,"index.html")


jwt = JWTManager(app)


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in BLOCKLIST


api.add_resource(Item, "/item/<string:name>")
api.add_resource(ItemList, "/items")
api.add_resource(ItemCategory,"/items/category/<string:category>")
api.add_resource(ItemCategoryList,"/items/categories")
api.add_resource(UserRegister, "/register")
api.add_resource(UserLogin, "/login")
api.add_resource(TokenRefresh, "/refresh")
api.add_resource(UserLogout, "/logout")
api.add_resource(UserProfile, "/userprofile")
api.add_resource(Contact,"/contact")
api.add_resource(SendOrder,'/send-order')

if __name__=="__main__":
    app.run(debug=True)
