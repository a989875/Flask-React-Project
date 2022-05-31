from flask_jwt_extended import (create_access_token, create_refresh_token,
                                get_jti, get_jwt_identity, jwt_required)
from flask_restful import Resource, reqparse
from models.order import OrderModel
from models.item import ItemModel


class SendOrder(Resource):

    @classmethod
    @jwt_required()
    def post(cls):
        
        order_parser = reqparse.RequestParser()
        order_parser.add_argument(
             "item_name", type=str, dest='item'#, required=True
        )
        
        order_parser.add_argument(
            "quantity", type=int#, required=True
        )
        user = get_jwt_identity()
        data = order_parser.parse_args()
        data['user']=user
        
        if data['quantity'] > ItemModel.check_item_quantity(data['item']):
            return {'message':"Out of Stock"},500
        
        order = OrderModel(**data)
        ItemModel.update_item_quantity(data['item'],data['quantity'])
        order.save_to_db()
        
        return {'message':"Order complete!"},200