import os

from extensions import db
from datetime import datetime
import pytz

from sqlalchemy import Boolean
from sqlalchemy.orm import relationship, validates

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
            'email_address': self.email_address,
        }

# create a listing model
class Listing(db.Model):
    __tablename__ = 'listing'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seller = db.relationship('User', backref=db.backref('listings', lazy=True))
    description = db.Column(db.String(250))
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)
    is_service = db.Column(Boolean, default=False, nullable=False)
    is_auction = db.Column(Boolean, default=False, nullable=False)
    auction_end_time = db.Column(db.DateTime, nullable=True)
    is_processed = db.Column(Boolean, default=False, nullable=False)
    bid_item = db.relationship('BidItem',
                            back_populates='listing',
                            uselist=False,
                            lazy='joined')

            
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'seller_id': self.seller_id,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'is_service': self.is_service,
            'is_auction': self.is_auction,
            'auction_end_time': self.auction_end_time,
            'is_processed': self.is_processed,
        }

# create an item to bid on
class BidItem(db.Model):
    __tablename__ = 'bid_item'
    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))
    bid_count = db.Column(db.Integer, default=0) # initialize bid count
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

    def get_est_now():
        est_tz = pytz.timezone('US/Eastern')
        utc_now = datetime.utcnow().replace(tzinfo=pytz.utc)
        return utc_now.astimezone(est_tz)

    bid_time = db.Column(db.DateTime, default=get_est_now)  # When the bid was placed

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
        
