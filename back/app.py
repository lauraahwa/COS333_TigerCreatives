from flask import request, jsonify, session, Flask, url_for, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from datetime import datetime, timedelta

from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode

import os
import uuid
import auth

import cloudinary
import cloudinary.uploader
import cloudinary.api

from dotenv import load_dotenv

from models import User, Listing
from extensions import db

load_dotenv()

app = Flask(__name__)
app.secret_key=os.getenv('APP_SECRET_KEY')
_DATABASE_URL = os.getenv('DATABASE_URL')
_DATABASE_URL = _DATABASE_URL.replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_DATABASE_URI'] = _DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'meowmeow44556'
jwt = JWTManager(app)

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

# get info for a specific user
@app.route('/api/user/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):

    if not user_id:
        user_id = get_jwt_identity()

    user = User.query.get_or_404(user_id)

    return jsonify(user.to_dict(), 200)

# get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

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
    print(request.headers)  # Debug: Print headers to see if Authorization is present
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


# HANDLE LISTING FUNCITONALITY
@app.route('/api/listing/create', methods=['POST', 'OPTIONS'])
@jwt_required()
@cross_origin()
def create_listing():
    print('test')
    user_id = get_jwt_identity()
    print(user_id)
    data = request.get_json()
    print(data)
    new_listing = Listing(
        title=data['title'],
        seller_id=user_id,
        category_id=data.get('category_id', 2),
        description=data['description'],
        price=data['price'],
        image_url=data['image_url'],
        is_service=data['is_service'],
        is_auction=False

    )
    
    # if new_listing.is_auction:
    #     duration_hours = data.get('auction_duration_hours', 24)  # Default to 24 hours if not specified
    #     new_bid_item = BidItem(auction_duration=timedelta(hours=duration_hours))
    #     db.session.add(new_bid_item)
    #     db.session.flush()
    #     new_listing.bid_item = new_bid_item

    db.session.add(new_listing)
    db.session.commit()

    return jsonify(new_listing.to_dict()), 201

# get a list of all items/products listed on the platform
@app.route('/api/listing/items', methods=['GET'])
@cross_origin()
def get_items():
    listings = Listing.query.filter(Listing.is_service == False).all()
    return jsonify([listing.to_dict() for listing in listings])

# get a list of all of the services listed on the platform
@app.route('/api/listing/services', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_services():
    print(request.headers)
    listings = Listing.query.filter(Listing.is_service == True).all()
    return jsonify([listing.to_dict() for listing in listings])

# get a list of all listings created by a specfic user
@app.route('/api/listing/user_items', methods=['GET'])
@cross_origin()
@jwt_required()
def get_user_items():
    print(request.headers)
    user_id = get_jwt_identity()
    print(user_id)

    listings = Listing.query.filter(Listing.seller_id == user_id).all()

    return jsonify([listing.to_dict() for listing in listings])

@app.route('/api/listing/item/<int:id>', methods=['GET', 'OPTIONS'])
def get_listing(id):
    # Query the database for the listing with the provided ID
    listing = Listing.query.get(id)
    
    # If no listing is found, return an error message with a 404 status code
    if listing is None:
        return jsonify({"error": "Listing not found"}), 404
    
    # If a listing is found, return it as JSON
    return jsonify(listing.to_dict()), 200

#-----------------------------------------------------------------------
# BIDDING STUFF

# creating a bid item
@cross_origin()
@app.route('/api/bid/create-bid', methods=['POST', 'OPTIONS'])
def create_bid():
    user_id = get_jwt_identity()
    data = request.get_json()

    new_bid_item = Bid(title=data['title'], seller_id=user_id,
                          category_id=2,
                          description=data['description'], price=data['price'], 
                          image_url = data['image_url'], bid_time=data['bid_time'])
    
    db.session.add(new_bid_item)
    db.session.commit()

    return jsonify(new_bid.to_dict()), 200

# placing a big
@app.route('/api/bid/place', methods=['POST'])
#
def place_bid():
    user_id = get_jwt_identity()
    data = request.get_json()

#     new_bid_item = Bid(title=data['title'], seller_id=user_id,
#                           category_id=2,
#                           description=data['description'], price=data['price'], 
#                           image_url = data['image_url'], bid_time=data['bid_time'])
    
#     db.session.add(new_bid_item)
#     db.session.commit()

#     return jsonify(new_bid.to_dict()), 200

# # place bid
# @app.route('/api/bid/place', methods=['POST'])
# @jwt_required()
# def place_bid():
#     user_id = get_jwt_identity()
#     data = request.get_json()
#     bid_item = BidItem.query.get(data['bid_item_id'])
#     if not bid_item:
#         return jsonify({"error": "Bid item not found"}), 404

#     if not bid_item.auction_start_time:
#         bid_item.auction_start_time = datetime.utcnow()

#     new_bid = Bid(
#         bid_item_id=bid_item.id,
#         bidder_id=user_id,
#         bid_amount=data['bid_amount']
#     )
#     db.session.add(new_bid)
#     db.session.commit()

#     return jsonify(new_bid.to_dict()), 201


# # view bid items
# @app.route('/api/biditem/view', methods=['GET'])
# def get_bids_for_item(biditem_id):
#     bids = Bid.query.filter_by(biditem_id=biditem_id).all()
    
#     return jsonify([bid.to_dict() for bid in bids])

# # # Define a protected route
# # @app.route('/protected', methods=['GET'])
# # def protected():
# #     if 'username' not in session:
# #         return redirect(url_for('login'))
    
# #     # Fetch user data from the database
# #     user = User.query.filter_by(username=session['username']).first()
# #     if not user:
# #         return 'User not found'
    
# #     # Return user data
# #     return jsonify({
# #         'username': user.username,
# #         'email': user.email
# #     })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
