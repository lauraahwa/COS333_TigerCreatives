from . import db

# create a user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    university = db.Column(db.String(100))
    email_address = db.Column(db.String(100), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'university': self.university,
            'email_address': self.email_address,
            'age': self.age
        }