from db import db

class ContactModel(db.Model):
    __tablename__ = "contact"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(80))
    content = db.Column(db.String(250))
    
    def __init__(self,name,email,content):
        self.name = name
        self.email = email
        self.content = content
        
    def json(self):
        return {"id":self.id,"name":self.name,"email":self.email,"content":self.content}    
    

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        
    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()