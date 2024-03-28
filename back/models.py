import os
import sqlalchemy
import sqlalchemy.orm


_DATABASE_URL = os.environ['DATABASE_URL']
_DATABASE_URL = _DATABASE_URL.replace('postgres://', 'postgresql://')

_engine = sqlalchemy.create_engine(_DATABASE_URL)
Base = sqlalchemy.orm.declarative_base()
Base.metadata.drop_all(_engine)
Base.metadata.create_all(_engine)

# create a user model
class User(Base):
    __tablename__ = 'user'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    first_name = sqlalchemy.Column(sqlalchemy.String(50), nullable=False)
    last_name = sqlalchemy.Column(sqlalchemy.String(50), nullable=False)
    university = sqlalchemy.Column(sqlalchemy.String(100))
    email_address = sqlalchemy.Column(sqlalchemy.String(100), unique=True, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'university': self.university,
            'email_address': self.email_address,
            'age': self.age
        }