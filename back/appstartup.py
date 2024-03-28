from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import User

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get('DATABASE_URL')
    db.init_app(app)

    return app
