from typing import Dict, Union

from db import db

UserJSON = Dict[str, Union[int, str]]


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(128))
    email = db.Column(db.String(80),unique=True)
    phone = db.Column(db.String(80),unique=True)

    def __init__(self, username: str, password: str,email:str,phone:str):
        self.username = username
        self.password = password
        self.email=email
        self.phone=phone

    def json(self):
        return {"id": self.id, "username": self.username,"phone":self.phone,'email':self.email}

    @classmethod
    def find_by_username(cls, username: str):
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_phone(cls, phone: str):
        return cls.query.filter_by(phone=phone).first()
    
    @classmethod
    def find_by_email(cls, email: str):
        return cls.query.filter_by(email=email).first()


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
