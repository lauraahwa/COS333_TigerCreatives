from flask import request, jsonify, session, Flask
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os
import auth
import uuid

import cloudinary
import cloudinary.uploader
import cloudinary.api

from dotenv import load_dotenv

from models import User
from models import Listing
from models import Bid
from extensions import db

load_dotenv()

app = Flask(__name__)
_DATABASE_URL = os.getenv('DATABASE_URL')
_DATABASE_URL = _DATABASE_URL.replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_DATABASE_URI'] = _DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'meowmeow44556'
jwt = JWTManager(app)
db.init_app(app)

CORS(app)

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

@app.route('/login', methods=['POST'])
def login():
    access_token = create_access_token(identity=12)
    return jsonify(access_token=access_token)

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

#-----------------------------------------------------------------------

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():

    username = auth.authenticate()

    html_code = flask.render_template('index.html',
        username=username)
    response = flask.make_response(html_code)
    return response

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
@cross_origin()
@jwt_required()
def create_listing():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_listing = Listing(title=data['title'], seller_id=user_id,
                          category_id=2,
                          description=data['description'], price=data['price'], 
                          image_url = data['image_url'])
    db.session.add(new_listing)
    db.session.commit()
    # what does the 201 do?
    return jsonify(new_listing.to_dict()), 200

@app.route('/api/listing/items', methods=['GET'])
# @jwt_required()
def get_items():
    listings = Listing.query.all()
    return jsonify([listing.to_dict() for listing in listings])

@app.route('/api/listing/item/<int:id>', methods=['GET'])
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
@jwt_required()
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
'''
# placing a big
@app.route('/api/bid/place', methods=['POST'])
# @jwt_required()
def place_bid():
    user_id = get_jwt_identity()
    data = request.get_json()

    new_bid = Bid(amount=data['amount'], user_id=user_id, 
        biditem_id=data['biditem_id'])

    db.session.add(new_bid)
    db.session.commit()
    return jsonify(new_bid.to_dict()), 200
'''
# view bid items
@app.route('/api/biditem/view', methods=['GET'])
def get_bids_for_item(biditem_id):
    bids = Bid.query.filter_by(biditem_id=biditem_id).all()
    
    return jsonify([bid.to_dict() for bid in bids])

# # Define a protected route
# @app.route('/protected', methods=['GET'])
# def protected():
#     if 'username' not in session:
#         return redirect(url_for('login'))
    
#     # Fetch user data from the database
#     user = User.query.filter_by(username=session['username']).first()
#     if not user:
#         return 'User not found'
    
#     # Return user data
#     return jsonify({
#         'username': user.username,
#         'email': user.email
#     })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
