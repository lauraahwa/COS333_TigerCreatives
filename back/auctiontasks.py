import apscheduler
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
from models import BidItem, Bid
from datetime import datetime, timedelta

def check_auctions():
    now = datetime.utcnow()
    recently_ended_items = BidItem.query.filter(BidItem.auction_end_time <= now, BidItem.auction_end_time > now - timedelta(minutes=1)).all()
    for item in recently_ended_items:
        highest_bid = Bid.query.filter_by(bid_item_id=item.id).order_by(Bid.bid_amount.desc()).first()
        if highest_bid:
            print(f'Highest bid for item {item.id} was {highest_bid.bid_amount} by user {highest_bid.bidder_id}')

def setup_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_auctions, 'interval', minutes=1)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
