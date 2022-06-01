from db import db


class OrderModel(db.Model):
    __tablename__ = "order"
    order_id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(80))
    item = db.Column(db.String(80))
    quantity = db.Column(db.Integer)

    def __init__(self, user, item, quantity):
        self.user = user
        self.item = item
        self.quantity = quantity

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
