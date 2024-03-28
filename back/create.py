import models
import sqlalchemy
import sqlalchemy.orm

models.Base.metadata.drop_all(models._engine)
models.Base.metadata.create_all(models._engine)

with sqlalchemy.orm.Session(models._engine) as session:
    user = models.User(first_name='Laura', last_name='Hwa', university='Princeton', email_address='laurah4@princeton.edu')
    session.add(user)
    session.commit()

