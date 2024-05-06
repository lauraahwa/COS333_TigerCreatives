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

#----------------------------------------------------------------------------

load_dotenv()

app = Flask(__name__)
app.secret_key=os.getenv('APP_SECRET_KEY')
_DATABASE_URL = os.getenv('DATABASE_URL')
_DATABASE_URL = _DATABASE_URL.replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_DATABASE_URI'] = _DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'meowmeow44556'

# TO SEND EMAILS
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@example.com'
app.config['MAIL_PASSWORD'] = 'your-password'
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
@jwt_required()
def get_user(user_id):

    if user_id == 0:
        print('this runs')
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
@cross_origin()
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
    print(type(data))
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
            # Parse the auction_end_time from the request data
            est_tz = pytz.timezone('US/Eastern')
            auction_end_time = datetime.strptime(data['auction_end_time'], '%Y-%m-%d %H:%M:%S')
            auction_end_time = est_tz.localize(auction_end_time)
            cur_est = datetime.now(est_tz)
            if auction_end_time < (cur_est + timedelta(minutes=0)):
                return jsonify({"error": "Auction end time must be at least 2 mins from now."}), 400
        except ValueError:
            return jsonify({"error": "Invalid format for auction end time. Use YYYY-MM-DD HH:MM:SS."}), 402
    else:
        auction_end_time = None
    print(data)

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
        auction_end_time=auction_end_time,
        is_processed=is_processed,
        start_price=data['start_price']
    )

    db.session.add(new_listing)
    db.session.flush()

    if new_listing.is_auction:
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

    # probably add the below field
    # Listing.auction_end_time > current_time

    return jsonify([auction.to_dict() for auction in auctions])

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
    
    listing.is_processed = True
    db.session.commit()

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
    return jsonify([listing.to_dict() for listing in listings])

#----------------------------------------------------------------------------

# get a list of all of the services listed on the platform
@app.route('/api/listing/services', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_services():
    print(request.headers)
    listings = Listing.query.filter(Listing.is_service == True).all()
    return jsonify([listing.to_dict() for listing in listings])

#----------------------------------------------------------------------------

# get a list of all listings created by a specfic user
@app.route('/api/listing/user_items', methods=['GET'])
@cross_origin()
@jwt_required()
def get_user_items():
    print(request.headers)
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
    auction_end_time = est_tz.localize(bid_item.auction_end_time)
    if auction_end_time > datetime.now(est_tz):
        return jsonify({'error': 'Auction has not ended yet'}), 400
    
    listing = bid_item.listing

    # find the highest bid
    highest_bid = Bid.query.filter_by(bid_item_id=bid_item.id).order_by(Bid.bid_amount.desc()).first()
    if highest_bid:
        listing.is_processed = True
        db.session.commit()

        # get the user objects
        bidder = User.query.get(highest_bid.bidder_id)
        seller = User.query.get(listing.seller_id)

        b_email = bidder.email_address
        s_email = seller.email_address

        text = f"Congratulations {bidder.first_name} {bidder.last_name}, you won the auction for item {listing.title} with a bid of {highest_bid.bid_amount}."

        try:
            send_email(b_email, text)
            send_email(s_email, "Your item has been sold!")
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
        return jsonify({"message": "no bids found for this item"}), 200
    
#----------------------------------------------------------------------------

def send_email(to, text):
    MAILGUN_API_KEY = "ed54d65c-6964eaff"
    MAILGUN_DOMAIN_NAME = "sandbox4303d2cc641e4a17b3997aa9265f3240.mailgun.org"
    MAILGUN_API_URL = f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN_NAME}/messages"
    
    return requests.post(
        MAILGUN_API_URL,
        auth=("api", MAILGUN_API_KEY),
        data={
            "from": f"TigerCreatives Team <mailgun@{MAILGUN_DOMAIN_NAME}>",
            "to": [to],
            "subject": "Finalizing Your TigerCreatives Transaction!",
            "text": text,
        },
    )

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

    if listing.bid_item:
        bid_item_id = listing.bid_item.id
    else:
        return jsonify({"error": "not an auction"}), 404


    bid_amount = float(data.get('bid_amount'))
    if not bid_item_id:
        return jsonify({"error": "Bid item ID must be provided"}), 400
    if not bid_amount:
        return jsonify({"error": "Bid amount must be provided"}), 400

    bid_item = BidItem.query.get(bid_item_id)
    if not bid_item:
        return jsonify({"error": "Bid item not found"}), 405

    # Check if new bid is at least $0.50 higher than the last
    highest_bid = bid_item.get_highest_bid()
    if bid_amount <= highest_bid + 0.50:
        return jsonify({"error": "Your bid must be at least $0.50 higher than the current highest bid of ${:.2f}$".format(highest_bid)}), 400
    
    # Check if new bid is at least $0.50 higher than the start price
    start_price = bid_item.start_price
    if bid_amount <= start_price + 0.50:
        return jsonify({"error": "Your bid must be at least $0.50 higher than the start price bid of ${:.2f}$".format(start_price)}), 400
    
    est_tz = pytz.timezone('US/Eastern')
    utc_now = datetime.utcnow().replace(tzinfo=pytz.utc)
    est_now = utc_now.astimezone(est_tz)
    print(est_now)

    if not bid_item.auction_start_time:
        bid_item.auction_start_time = est_now

    new_bid = Bid(
        bid_item_id=bid_item.id,  # Link this bid to the retrieved bid item
        bidder_id=user_id,
        bid_amount=data['bid_amount'],
        bid_time=est_now
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
    highest_bid = Bid.query.filter_by(bid_item_id=bid_item.id).order_by(Bid.bid_amount.desc()).first().bid_amount

    bid_item_dict = bid_item.to_dict()

    return jsonify({**bid_item_dict, 'highest_bid': highest_bid}), 200

#-------------------------------------------------------------------------

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
