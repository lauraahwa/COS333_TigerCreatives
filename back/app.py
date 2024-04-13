from flask import request, jsonify, session, Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import auth

from models import User
from models import Listing
from extensions import db

app = Flask(__name__)
_DATABASE_URL = os.environ['DATABASE_URL']
_DATABASE_URL = _DATABASE_URL.replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_DATABASE_URI'] = _DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

CORS(app)

# create a user
@app.route('/users/create', methods=['POST'])
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

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # Authenticate user
    if authenticate(username, password):
        session['username'] = username
        return redirect(url_for('protected'))
    else:
        return 'Invalid credentials'

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

# HANDLE LISTING FUNCITONALITY
@app.route('/seller/listing', methods=['POST'])
def create_listing():
    data = request.get_json()
    new_listing = Listing(title=data['title'], seller_id=data['user_id'],
                          category_id=data['category_id'],
                          description=data['description'], price=data['price'], 
                          image_url = data['image_url'])
    db.session.add(new_listing)
    db.session.commit()
    # what does the 201 do?
    return jsonify(new_listing.to_dict()), 201

# Define a protected route
@app.route('/protected', methods=['GET'])
def protected():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    # Fetch user data from the database
    user = User.query.filter_by(username=session['username']).first()
    if not user:
        return 'User not found'
    
    # Return user data
    return jsonify({
        'username': user.username,
        'email': user.email
    })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)