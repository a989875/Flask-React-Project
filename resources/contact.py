from models.contact import ContactModel
from flask_restful import Resource, reqparse

SUCCESS = "Thank you for your message."


class Contact(Resource):
    contact_parser = reqparse.RequestParser()
    contact_parser.add_argument("name", type=str)
    contact_parser.add_argument("email", type=str)
    contact_parser.add_argument("content", type=str)

    @classmethod
    def post(cls):
        data = cls.contact_parser.parse_args()
        contact = ContactModel(**data)
        contact.save_to_db()

        return {"message": SUCCESS}, 200
