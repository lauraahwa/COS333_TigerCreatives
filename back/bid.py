import datetime
import models
import time
import sqlalchemy
import sqlalchemy.orm

models.Base.metadata.drop_all(models._engine)
models.Base.metadata.create_all(models._engine)

with sqlalchemy.orm.Session(models._engine) as session:
    user = models.User(first_name='Laura', last_name='Hwa', university='Princeton', email_address='laurah4@princeton.edu')
    session.add(user)
    session.commit()

'''
def timer():
    t = 5
    while t > 0:
        print(t)
        t -= 1
        time.sleep(1)
    print("BLAST OFF!")

def select_highest_bid():
    current_time = datetime.utcnow()

    open_bids = BidItem.query.filter(BidItem.end_time > current_time).all()

    for bid_item in open_bids:
        highest_bid = Bid.query.filter_by(biditem_id=bid_item.id).order_by(Bid.amount.desc()).first()

        if highest_bid:
            print(f"Highest bid for {bid_item.title}: {highest_bid.amount}")'''
'''
