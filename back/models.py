import os

from extensions import db
from datetime import datetime

# _DATABASE_URL = os.environ['DATABASE_URL']
# _DATABASE_URL = _DATABASE_URL.replace('postgres://', 'postgresql://')

# _engine = db.create_engine(_DATABASE_URL)
# Base = db.orm.declarative_base()
# Base.metadata.drop_all(_engine)
# Base.metadata.create_all(_engine)

# create a user model
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    university = db.Column(db.String(100))
    email_address = db.Column(db.String(100), unique=True, nullable=False)
    age = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'university': self.university,
            'email_address': self.email_address,
            'age': self.age,
        }

# create a listing model
class Listing(db.Model):
    __tablename__ = 'listing'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seller = db.relationship('User', backref=db.backref('listings', lazy=True))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    description = db.Column(db.String(250))
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)
    is_auction = db.Column(db.Boolean, default=False, nullable=False)  # Default is not an auction

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'seller_id': self.seller_id,
            'category_id': self.category_id,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'is_auction': self.is_auction
        }

# create a category model
class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)

# # create an item to bid on
# class BidItem(db.Model):
#     __tablename__ = 'bid_item'
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String, nullable=False)
#     description = db.Column(db.String)
#     start_time = db.Column(db.DateTime, default=datetime.datetime.now)
#     end_time = db.Column(db.DateTime, nullable=False)

#     # relationships
#     bids = db.relationship('Bid', back_populates='item')

# create a bid
'''
class Bid(db.Model):
    __tablename__ = 'bids'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    bid_time = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    biditem_id = db.Column(db.Integer, db.ForeignKey('bid_item.id'))
'''
class Bid(db.Model):
    __tablename__ = 'bid'
    biditem_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seller = db.relationship('User', backref=db.backref('bids', lazy=True))
    category_id = db.Column(db.Integer, nullable=False)  # implement foreign key to category later
    description = db.Column(db.String(250))
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)
    bid_time = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict_bid(self):
        return {
            'biditem_id': self.id,
            'title': self.title,
            'seller_id': self.seller_id,
            'category_id': self.category_id,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'bid_time': self.bid_time.isoformat() if self.bid_time else None
        }

#     # Relationships
#     user = db.relationship('User', back_populates='bids')
#     item = db.relationship('BidItem', back_populates='bids')