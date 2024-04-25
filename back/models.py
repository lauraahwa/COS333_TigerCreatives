import os

from extensions import db
from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy.orm import relationship

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
    category_id = db.Column(db.Integer, nullable=False)  # FK to category should be defined if not already
    description = db.Column(db.String(250))
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)
    is_service = db.Column(Boolean, default=False, nullable=False)
    is_auction = db.Column(Boolean, default=False, nullable=False)
    bid_item_id = db.Column(db.Integer, db.ForeignKey('bid_item.id'))
    bid_item = relationship('BidItem',
                            back_populates='listing',
                            uselist=False,
                            lazy='joined',
                            primaryjoin="Listing.id==foreign(remote(BidItem.listing_id))")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'seller_id': self.seller_id,
            'category_id': self.category_id,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'is_service': self.is_service,
        }

# create a category model
class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)

# # create an item to bid on
class BidItem(db.Model):
    __tablename__ = 'bid_item'
    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))  # Ensure this FK is correct
    auction_start_time = db.Column(db.DateTime)
    auction_duration = db.Column(db.Interval)
    listing = relationship('Listing',
                           back_populates='bid_item',
                           remote_side=[id],
                           foreign_keys=[listing_id])

    @property
    def auction_end_time(self):
        if self.auction_start_time and self.auction_duration:
            return self.auction_start_time + self.auction_duration
        return None

# create a bid
class Bid(db.Model):
    __tablename__ = 'bid'
    id = db.Column(db.Integer, primary_key=True)
    bid_item_id = db.Column(db.Integer, db.ForeignKey('bid_item.id'))  # Link to the bid item
    bidder_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # Link to the user making the bid
    bid_amount = db.Column(db.Float, nullable=False)  # The amount of the bid
    bid_time = db.Column(db.DateTime, default=datetime.utcnow)  # When the bid was placed

    bidder = db.relationship('User', backref='bids', lazy=True)