from flask import request, jsonify, session, Flask, url_for, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token
from flask_jwt_extended.exceptions import NoAuthorizationError
from jwt import ExpiredSignatureError
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_mail import Mail, Message
from datetime import datetime, timedelta
import pytz
# from apscheduler.schedulers.background import BackgroundScheduler

from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode

import os
import uuid
import auth

import cloudinary
import cloudinary.uploader
import cloudinary.api

from dotenv import load_dotenv

from models import User, Listing, Bid, BidItem, Review
from extensions import db

import numpy as np

#----------------------------------------------------------------------------

load_dotenv()

app = Flask(__name__)
app.secret_key=os.getenv('APP_SECRET_KEY')
_DATABASE_URL = os.getenv('DATABASE_URL')
_DATABASE_URL = _DATABASE_URL.replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_DATABASE_URI'] = _DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'meowmeow44556'

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'tigercreatives@gmail.com'
app.config['MAIL_PASSWORD'] = 'agwr mytf gqde bczy'
app.config['MAIL_DEFAULT_SENDER'] = 'tigercreatives@gmail.com'

mail = Mail(app)

jwt = JWTManager(app)

#----------------------------------------------------------------------------

app.config['APP_SECRET_KEY'] = os.getenv('APP_SECRET_KEY')

oauth = OAuth(app)
auth0 = oauth.register(
    "auth0",
    client_id=os.getenv("AUTH0_CLIENT_ID"),
    client_secret=os.getenv("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{os.getenv("AUTH0_DOMAIN")}/.well-known/openid-configuration',
    authorize_url=f'https://{os.getenv("AUTH0_DOMAIN")}/authorize',
    api_base_url=f'https://{os.getenv("AUTH0_DOMAIN")}',
    access_token_url=f'https://{os.getenv("AUTH0_DOMAIN")}/oauth/token',
)


CORS(app)

migrate = Migrate(app, db)
db.init_app(app)

#----------------------------------------------------------------------------
# Handle auth errors globally

# @jwt.unauthorized_loader
# def unauthorized_response(callback):
#     return jsonify({'error': 'Authorization required', 'redirect': '/login'}), 401

# @jwt.invalid_token_loader
# def invalid_token_response(callback):
#     return jsonify({'error': 'Invalid token', 'redirect': '/login'}), 422

# @jwt.expired_token_loader
# def expired_token_response(callback):
#     return jsonify({'error': 'Token has expired', 'redirect': '/login'}), 401

#----------------------------------------------------------------------------

# create a user
@app.route('/api/users/create', methods=['POST'])
@cross_origin()
def create_user():
    data = request.get_json()
    new_user = User(first_name=data['first_name'], last_name=data['last_name'],
                    university=data['university'], email_address=data['email_address'],
                    age=data['age'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

#----------------------------------------------------------------------------

# get info for a specific user
@app.route('/api/users/get_user/<int:user_id>', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_user(user_id):

    user = User.query.get_or_404(user_id)

    return jsonify(user.to_dict()), 200

@app.route('/api/users/get_self', methods=['GET', 'OPTIONS'])
@jwt_required()
@cross_origin()
def get_current_user():

    user_id = get_jwt_identity()

    user = User.query.get_or_404(user_id)

    return jsonify(user.to_dict()), 200

# edit user info

#----------------------------------------------------------------------------

# get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

#----------------------------------------------------------------------------

@app.route('/users/<int:user_id>', methods=['PUT', 'DELETE'])
def handle_user(user_id):
    user = User.query.get_or_404(user_id)
    if request.method == 'PUT':
        data = request.get_json()
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.university = data.get('university', user.university)
        user.email_address = data.get('email_address', user.email_address)
        user.age = data.get('age', user.age)
        db.session.commit()
        return jsonify(user.to_dict())
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200

#-----------------------------------------------------------------------

# Routes for authentication from PennyCAS program

@app.route('/logoutapp', methods=['GET'])
def logoutapp():
    return auth.logoutapp()

@app.route('/logoutcas', methods=['GET'])
def logoutcas():
    return auth.logoutcas()


#-----------------------------------------------------------------------
# REVIEWS

@app.route('/api/reviews/create', methods=['POST', 'OPTIONS'])
@cross_origin()
@jwt_required()
def create_review():
    data = request.get_json()
    
    user_id = get_jwt_identity()
    seller_id = data.get('seller_id')
    rating = data.get('rating')
    text = data.get('text')

    # if any of fields are missing
    if not seller_id or not rating:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the listing exists
    seller = User.query.get(seller_id)
    if not seller:
        return jsonify({'error': 'Listing not found'}), 404

    # Check if the user is trying to review their own listing
    if seller_id == user_id:
        return jsonify({'error': "Cannot review your own listing"}), 403

    # Check if the user has already reviewed this seller
    # existing_review = Review.query.filter_by(user_id=user_id, seller_id=seller_id).first()
    # if existing_review:
    #     return jsonify({'error': "You have already reviewed this seller"}), 400

    # All checks passed, create the review
    new_review = Review(user_id=user_id, seller_id=seller_id, rating=rating, text=text)
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@app.route('/api/reviews/get/<int:seller_id>', methods=['GET'])
def get_reviews(seller_id):
    
    reviews = Review.query.filter_by(seller_id=seller_id).all()

    if reviews:
        return jsonify([review.to_dict() for review in reviews]), 200
    else:
        return jsonify({'message': 'No reviews found for this user'}), 200

#-----------------------------------------------------------------------

# GENERATE TOKEN FOR TESTING
@app.route('/token', methods=['GET'])
@cross_origin()
def get_token():
    access_token = create_access_token(identity=12)
    return jsonify({'access_token': access_token}), 200

# LOGIN STUFF
@app.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():

    data = request.get_json()
    print(data)
    email = data.get('email')
    user = User.query.filter(User.email_address == email).all()
    if user:
        access_token = create_access_token(identity=user[0].id)
        return jsonify(access_token), 200
    new_user = User(email_address=email, first_name=data['given_name'],
                    last_name=data['family_name'])
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=user.id)
    return jsonify(new_user.to_dict(), access_token), 201

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
#-----------------------------------------------------------------------

# @app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
    print("hii")
    username = auth.authenticate()

    return username

#-----------------------------------------------------------------------
# upload an image and return the cloudinary url
@app.route('/api/upload_image', methods=['POST'])
@cross_origin()
def upload_image():
    try:
        file = request.files['image']
        if not file:
            return jsonify({
                'error': 'No file provided'
            }), 400
        
        tag = str(uuid.uuid4())

        filename = f"Picture_${tag}"

        cloudinary.config(cloud_name=os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), api_secret=os.getenv('API_SECRET'))

        cloudinary.uploader.upload(file, public_id=filename, unique_filename=True)

        srcURL = cloudinary.CloudinaryImage(filename).build_url()

        print(srcURL)

        return jsonify({
            'message': 'Image uploaded',
            'url': srcURL
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

#----------------------------------------------------------------------------

# HANDLE LISTING FUNCITONALITY
@app.route('/api/listing/create', methods=['POST', 'OPTIONS'])
@jwt_required()
@cross_origin()
def create_listing():
    print('test')
    user_id = get_jwt_identity()
    data = request.get_json()

    # Check if is_auction is True and validate auction_end_time
    if data.get('is_auction', True):
        try:
            # parse auction end time
            naive_datetime = datetime.strptime(data['auction_end_time'], '%Y-%m-%d %H:%M:%S')
            # convert utc (the default) time to EST
            est_tz = pytz.timezone('US/Eastern')
            auction_end_time_est = est_tz.localize(naive_datetime)

            # format the EST time
            auction_end_time_formatted = auction_end_time_est.strftime('%a, %d %b %Y %H:%M:%S %Z')
            print(auction_end_time_est)
            print(auction_end_time_formatted)

            # get the current EST time
            # Parse the auction_end_time from the request data
            cur_est = datetime.now(est_tz)
            if auction_end_time_est < (cur_est + timedelta(minutes=2)):
                return jsonify({"error": "Auction end time must be at least 2 mins from now."}), 400
        except ValueError:
            return jsonify({"error": "Invalid format for auction end time. Use YYYY-MM-DD HH:MM:SS."}), 402
    else:
        auction_end_time_formatted = None
    
    # put in a default start
    if data['start_price'] is None:
        data['start_price'] = 0

    try:
        start_price = data['start_price']
    except:
        start_price = None

    try:
        is_processed = data['is_processed']
    except:
        is_processed = None
        
    
    new_listing = Listing(
        title=data['title'],
        seller_id=user_id,
        description=data['description'],
        price=data['price'],
        image_url=data['image_url'],
        is_auction=data['is_auction'],
        is_service=data['is_service'],
        auction_end_time=auction_end_time_formatted,
        is_processed=is_processed,
        start_price=start_price
    )

    db.session.add(new_listing)
    db.session.flush()

    if new_listing.is_auction:
        print(new_listing.auction_end_time)
        new_bid_item = BidItem(
            listing_id=new_listing.id,
            auction_start_time=None,  # Start time could be set when the first bid is made
            auction_end_time=new_listing.auction_end_time,
            start_price=new_listing.start_price
        )
        db.session.add(new_bid_item)

    db.session.commit()

    return jsonify(new_listing.to_dict()), 201

#----------------------------------------------------------------------------

@app.route('/api/listing/sorted', methods=['GET'])
@cross_origin()
def get_sorted_auctions():
    current_time = datetime.utcnow()

    auctions = Listing.query.filter(
        Listing.is_auction == True,
        Listing.auction_end_time != None,
        Listing.is_processed == False
    ).order_by(Listing.auction_end_time).limit(4).all()

    auctions_data = []

    for auction in auctions:
        highest_bid = auction.bid_item.get_highest_bid()
        if highest_bid != 0:
            display_price = highest_bid
        else:
            display_price = auction.start_price

        d = auction.to_dict()
        d['price'] = display_price

        auctions_data.append(d)
    # probably add the below field
    # Listing.auction_end_time > current_time

    return jsonify(auctions_data)

#----------------------------------------------------------------------------
@app.route('/api/listing/buynow', methods=['PUT'])
@jwt_required()
@cross_origin()
def buy():
    user_id = get_jwt_identity()
    data = request.get_json()
    listing_id = data['listingId']
    print(listing_id)

    listing = Listing.query.get(listing_id)

    if listing is None:
        return jsonify({'error': 'Listing not found'}), 404

    # prevent seller from buying their own listing
    if listing.seller_id == user_id:
        return jsonify({'error': 'You cannot buy your own listing.'}), 400
    
    listing.is_processed = True
    db.session.commit()

    buyer = User.query.get(user_id)
    seller = User.query.get(listing.seller_id)

    try:
        send_buyer_mail(seller.email_address, buyer.email_address, listing.title, listing.price)
        send_seller_mail(seller.email_address, buyer.email_address, listing.title, listing.price)
    except Exception as e:
        return jsonify({"error": f"Email sending failed: {str(e)}"}), 500
    

    return jsonify({'success': True, 'message': 'Marked as bought in database'}), 200

    
#----------------------------------------------------------------------------

# delete a listing
@app.route('/api/listing/delete/<int:listing_id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_listing(listing_id):
    listing = Listing.query.get(listing_id)
    if listing is None:
        return jsonify({'error': 'Listing not found'}), 404

    user_id = get_jwt_identity()
    if listing.seller_id != user_id:
        return jsonify({'error': 'Unauthorized to delete this listing'}), 403

    # Delete the listing from the database
    db.session.delete(listing)
    db.session.commit()
    
    return jsonify({'message': 'Listing deleted successfully'}), 200

# get a list of all items/products listed on the platform
@app.route('/api/listing/items', methods=['GET'])
@cross_origin()
def get_items():
    listings = Listing.query.filter(Listing.is_service == False, Listing.is_processed == False).all()

    data = []

    for listing in listings:
        if listing.is_auction:
            highest_bid = listing.bid_item.get_highest_bid()
            if highest_bid != 0:
                display_price = highest_bid
            else:
                display_price = listing.start_price

            d = listing.to_dict()
            d['price'] = display_price

            data.append(d)
        else:
            data.append(listing.to_dict())

    return jsonify(data)

#----------------------------------------------------------------------------

# get a list of all of the services listed on the platform
@app.route('/api/listing/services', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_services():
    listings = Listing.query.filter(Listing.is_service == True).all()
    return jsonify([listing.to_dict() for listing in listings])

#----------------------------------------------------------------------------

# get a list of all listings created by a specfic user
@app.route('/api/listing/user_items', methods=['GET'])
@cross_origin()
@jwt_required()
def get_user_items():
    user_id = get_jwt_identity()
    print(user_id)

    listings = Listing.query.filter(Listing.seller_id == user_id, Listing.is_processed == False).all()

    return jsonify([listing.to_dict() for listing in listings])

# get a list of all listings created by a specfic user
@app.route('/api/listing/seller_items/<int:seller_id>', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_seller_items(seller_id):
    listings = Listing.query.filter(Listing.seller_id == seller_id, Listing.is_processed == False).all()

    return jsonify([listing.to_dict() for listing in listings]), 200

@app.route('/api/listing/item/<int:id>', methods=['GET', 'OPTIONS'])
def get_listing(id):
    # Query the database for the listing with the provided ID
    listing = Listing.query.get(id)
    
    # If no listing is found, return an error message with a 404 status code
    if listing is None:
        return jsonify({"error": "Listing not found"}), 404
        
    
    # If a listing is found, return it as JSON
    return jsonify(listing.to_dict()), 200

#----------------------------------------------------------------------------

# view listings that are actively being bid on
@app.route('/api/listings/active', methods=['GET'])
def get_active_listings():
    active_listings = Listing.query.filter(
        Listing.is_auction == True,
        Listing.is_processed == False
    ).all()

    return jsonify([listing.to_dict() for listing in active_listings])

#----------------------------------------------------------------------------
# BELOW IS FOR BIDDING
#----------------------------------------------------------------------------

# creating a bid item
@cross_origin()
@app.route('/api/bid/create-bid', methods=['POST', 'OPTIONS'])
def create_bid():
    user_id = get_jwt_identity()
    data = request.get_json()
    print(data)

    new_bid_item = Bid(title=data['title'], seller_id=user_id,
                          description=data['description'], price=data['price'], 
                          image_url = data['image_url'], bid_time=data['bid_time'])
    
    db.session.add(new_bid_item)
    db.session.commit()

    return jsonify(new_bid_item.to_dict()), 200

#----------------------------------------------------------------------------

# process the bidding when its done; FOR TESTING
@cross_origin()
@app.route('/api/bid/process/<int:listing_id>', methods=['GET'])
def process_auction_end(listing_id):
    listing = Listing.query.get(listing_id)

    if not listing:
        return jsonify({"error": "listing not found"}), 404

    if listing.bid_item:
        bid_item_id = listing.bid_item.id
    else:
        return jsonify({"error": "not an auction"}), 404

    bid_item = BidItem.query.get(bid_item_id)
   
    if not bid_item:
        return jsonify({'error': 'Bid item not found'}), 404
    
    est_tz = pytz.timezone('US/Eastern')
    
    # convert string to datetime object
    auction_end_time_str = bid_item.auction_end_time
    auction_end_time = datetime.strptime(auction_end_time_str.strip(), '%a, %d %b %Y %H:%M:%S %Z')
    auction_end_time = est_tz.localize(auction_end_time)

    # get current time
    current_time = datetime.now(est_tz)
    if auction_end_time > current_time:
        return jsonify({'error': 'Auction has not ended yet'}), 400
    
    listing = bid_item.listing

    # find the highest bid
    highest_bid = Bid.query.filter_by(bid_item_id=bid_item.id).order_by(Bid.bid_amount.desc()).first()

    # process even if no bids are placed
    listing.is_processed = True
    db.session.commit()

    if highest_bid:
        # get the user objects
        bidder = User.query.get(highest_bid.bidder_id)
        seller = User.query.get(listing.seller_id)

        b_email = bidder.email_address
        s_email = seller.email_address

        try:
            send_bidder_auction_mail(s_email, b_email, listing.title, highest_bid.bid_amount)
            send_seller_auction_mail(s_email, b_email, listing.title, highest_bid.bid_amount)
        except Exception as e:
            return jsonify({"error": f"Email sending failed: {str(e)}"}), 500

        return jsonify({
            "message": f"Highest bid for item {bid_item_id} is {highest_bid.bid_amount}. There was/were {bid_item.bid_count} bid(s) placed",
            "bidder_id": highest_bid.bidder_id,
            "bidder_email": bidder.email_address,
            "seller_id": listing.seller_id,
            "seller_email": seller.email_address,
        }), 200
    else:
        seller = User.query.get(listing.seller_id)
        
        s_email = seller.email_address

        try:
            send_no_bids_mail(s_email, listing.title)
        except Exception as e:
            return jsonify({"error": f"Email sending failed: {str(e)}"}), 500

        return jsonify({"message": "No bids found for this item.\n"}), 200
    
#----------------------------------------------------------------------------
# FUNCTIONS FOR SENDING EMAILS
def send_buyer_mail(seller_email, buyer_email, item_name, price):
    msg = Message("Item bought on TigerCreatives!",
                  recipients=[buyer_email])
    msg.body = f"You have successfully purchased item: {item_name} for ${price} on TigerCreatives. Please contact {seller_email} to arrange payment and pickup. Congratulations!"
    mail.send(msg)
    return "Email sent!"

def send_seller_mail(seller_email, buyer_email, item_name, price):
    msg = Message("Item sold on TigerCreatives",
                  recipients=[seller_email])
    msg.body = f"Your item: {item_name} has sold for ${price} on TigerCreatives. Please contact {buyer_email} to arrange payment and pickup. Congratulations!"
    mail.send(msg)
    return "Email sent!"


def send_bidder_auction_mail(seller_email, bidder_email, item_name, bid_amount):
    msg = Message("Auction won on TigerCreatives",
                  recipients=[bidder_email])
    msg.body = f"Your bid on item: {item_name} of ${bid_amount} on TigerCreatives was the highest bid at the end of the auction. Please contact {seller_email} to arrange payment and pickup. Congratulations!"
    mail.send(msg)
    return "Email sent!"

def send_seller_auction_mail(seller_email, bidder_email, item_name, bid_amount):
    msg = Message("Auction ended on TigerCreatives",
                  recipients=[seller_email])
    msg.body = f"Your item: {item_name} has sold for ${bid_amount} on TigerCreatives as the auction has concluded. Please contact {bidder_email} to arrange payment and pickup. Congratulations!"
    mail.send(msg)
    return "Email sent!"

def send_no_bids_mail(seller_email, item_name):
    msg = Message("Auction ended on TigerCreatives",
                    recipients=[seller_email])
    msg.body = f"Your item: {item_name} has received no bids on TigerCreatives at the time of auction conclusion. Please consider relisting your item or listing other items!"
    mail.send(msg)
    return "Email sent!"
#----------------------------------------------------------------------------

# placing a bid
@app.route('/api/bid/place', methods=['POST'])
@jwt_required()
def place_bid():
    user_id = get_jwt_identity()
    data = request.get_json()

    listing_id = data.get('listing_id')
    listing = Listing.query.get(listing_id)

    if not listing:
        return jsonify({"error": "listing not found"}), 404
    
    # snsure that the seller isn't the one bidding
    if listing.seller_id == user_id:
        return jsonify({"error": "You cannot place a bid on your own listing."}), 400

    if listing.bid_item:
        bid_item_id = listing.bid_item.id
    else:
        return jsonify({"error": "not an auction"}), 404


    bid_amount = np.round(float(data.get('bid_amount')), 2)
    if not bid_item_id:
        return jsonify({"error": "Bid item ID must be provided"}), 400
    if not bid_amount:
        return jsonify({"error": "Bid amount must be provided"}), 400

    bid_item = BidItem.query.get(bid_item_id)
    if not bid_item:
        return jsonify({"error": "Bid item not found"}), 405
    
    # prevent bids from being placed after auction ends
    auction_end_time_str = bid_item.auction_end_time

    # get the current time in Eastern Time
    est_tz = pytz.timezone('US/Eastern')
    est_now = datetime.now(est_tz)

    # convert string to datetime object
    auction_end_time = datetime.strptime(auction_end_time_str.strip(), '%a, %d %b %Y %H:%M:%S %Z')
    auction_end_time = est_tz.localize(auction_end_time)

    if est_now > auction_end_time:
        return jsonify({"error": "You cannot place a bid at this time.\nThe auction has already ended."}), 400

    # check if new bid is at least $0.50 higher than the last
    highest_bid = bid_item.get_highest_bid()
    if bid_amount <= highest_bid + 0.50:
        return jsonify({"error": "Your bid must be at least $0.50 higher than the current highest bid of ${:.2f}$".format(highest_bid)}), 400
    
    # check if new bid is at least $0.50 higher than the start price
    start_price = bid_item.start_price
    if bid_amount <= start_price + 0.50:
        return jsonify({"error": "Your bid must be at least $0.50 higher than the start price bid of ${:.2f}$".format(start_price)}), 400
    
    # format the time
    est_now_str = est_now.strftime('%a, %d %b %Y %H:%M:%S %Z')
    print(est_now_str)

    if not bid_item.auction_start_time:
        bid_item.auction_start_time = est_now_str

    new_bid = Bid(
        bid_item_id=bid_item.id,  # Link this bid to the retrieved bid item
        bidder_id=user_id,
        bid_amount=bid_amount,
        bid_time=est_now_str
    )
    db.session.add(new_bid)
    bid_item.bid_count += 1
    db.session.commit()

    return jsonify(new_bid.to_dict()), 201

@app.route('/api/bid/get_info/<int:listing_id>', methods=['GET'])
@cross_origin()
def get_bid_info(listing_id):
    listing = Listing.query.get(listing_id)

    if not listing:
        return jsonify({"error": "listing not found"}), 404

    if listing.bid_item:
        bid_item_id = listing.bid_item.id
    else:
        return jsonify({"error": "not an auction"}), 404

    bid_item = BidItem.query.get(bid_item_id)

    if not bid_item:
        return jsonify({'error': 'Bid item not found'}), 404

    # get the highest bid
    try:
        highest_bid = Bid.query.filter_by(bid_item_id=bid_item.id).order_by(Bid.bid_amount.desc()).first().bid_amount
    except:
        highest_bid = 0

    bid_item_dict = bid_item.to_dict()

    return jsonify({**bid_item_dict, 'highest_bid': highest_bid}), 200

#-------------------------------------------------------------------------

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
