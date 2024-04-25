import datetime
import models
import time
import sqlalchemy
import sqlalchemy.orm

app = Flask(__name__)
CORS(app)

def timer(time_left):
    time_left = 5
    while time_left > 0:
        print(time_left)
        time_left -= 1
        time.sleep(1)
    print("end of bidding cycle")
'''
def select_highest_bid():
    current_time = datetime.utcnow()

    open_bids = BidItem.query.filter(BidItem.end_time > current_time).all()

    for bid_item in open_bids:
        highest_bid = Bid.query.filter_by(biditem_id=bid_item.id).order_by(Bid.amount.desc()).first()

        if highest_bid:
            print(f"Highest bid for {bid_item.title}: {highest_bid.amount}")'''
'''
