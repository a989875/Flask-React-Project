from db import db


class ItemModel(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    quantity = db.Column(db.Integer)
    quantity_left = db.Column(db.Integer)
    category = db.Column(db.String(80), nullable=False)
    imagelink = db.Column(db.String(80), nullable=False)

    def __init__(self, name: str, price: float, quantity: int, quantity_left: int, category: str, imagelink: str):
        self.name = name
        self.price = price
        self.quantity = quantity
        self.quantity_left = quantity_left
        self.category = category
        self.imagelink = imagelink

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "quantity": self.quantity_left,
            "imagelink": self.imagelink
        }

    @classmethod
    def find_by_name(cls, name: str):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_category(cls, category: str):
        return cls.query.filter_by(category=category).all()

    @classmethod
    def get_category_list(cls):
        return cls.query.with_entities(cls.category).distinct().all()

    @classmethod
    def check_item_quantity(cls, item):
        return cls.query.filter(ItemModel.name == item).first().quantity_left

    @classmethod
    def update_item_quantity(cls, item, quantity):
        return cls.query.filter(ItemModel.name == item).update({"quantity_left": ItemModel.quantity_left - quantity})

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
