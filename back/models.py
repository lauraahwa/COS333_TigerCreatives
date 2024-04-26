import os

from extensions import db
from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy.orm import relationship, validates

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
    email_address = db.Column(db.String(100), unique=True, nullable=False)

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
    category_id = db.Column(db.Integer, nullable=False) 
    description = db.Column(db.String(250))
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)
    is_service = db.Column(Boolean, default=False, nullable=False)
    is_auction = db.Column(Boolean, default=False, nullable=False)
    auction_end_time = db.Column(db.DateTime, nullable=True)
    bid_item = db.relationship('BidItem',
                            back_populates='listing',
                            uselist=False,
                            lazy='joined')
    
    # IMPLEMENT THE CHECK THAT AUCTION_END_TIME NEEDS TO BE IN THE FUTURE LATER
    # @validates('is_auction', 'auction_end_time')
    # def validate_auction_details(self, key, value):


    #     # make sure end time is set in the future
    #     if self.is_auction and self.auction_end_time:
    #         if self.auction_end_time <= datetime.utcnow():
    #             raise ValueError("Auction end time must be set in the future.")
            
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
            'is_auction': self.is_auction,
            'auction_end_time': self.auction_end_time,
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
    auction_end_time = db.Column(db.DateTime)
    listing = db.relationship('Listing',
                           back_populates='bid_item',
                           foreign_keys=[listing_id])
    
    # make sure that the bid_item endtime is in sync with the listing
    def create_or_update_from_listing(cls, listing):
        bid_item = listing.bid_item or cls(listing_id=listing.id)
        bid_item.auction_end_time = listing.auction_end_time
        return bid_item
    
    def get_highest_bid(self):
        # Fetch the highest bid amount related to this bid item
        highest_bid = db.session.query(db.func.max(Bid.bid_amount)).filter_by(bid_item_id=self.id).scalar()
        return highest_bid if highest_bid is not None else 0

# create a bid
class Bid(db.Model):
    __tablename__ = 'bid'
    id = db.Column(db.Integer, primary_key=True)
    bid_item_id = db.Column(db.Integer, db.ForeignKey('bid_item.id')) # Link to the bid item
    bidder_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # Link to the user making the bid
    bid_amount = db.Column(db.Float, nullable=False)  # The amount of the bid
    bid_time = db.Column(db.DateTime, default=datetime.utcnow)  # When the bid was placed
    bidder = db.relationship('User', backref='bid', lazy=True)
    bid_item = db.relationship('BidItem', backref=db.backref('bid', lazy='dynamic'))

    def to_dict(self):
        return{
            'id': self.id,
            'bid_item_id': self.bid_item_id,
            'bidder_id': self.bidder_id,
            'bid_amount': self.bid_amount,
            'bid_time': self.bid_time,
        }
        
