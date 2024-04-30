from datetime import datetime
from models import db, BidItem, Bid  # Assume appropriate models are imported

def check_auctions():
    current_time = datetime.utcnow()
    # Query BidItems whose auction end time has passed but not yet marked as processed
    bid_items = BidItem.query.filter(BidItem.auction_end_time <= current_time, BidItem.processed == False).all()

    for item in bid_items:
        process_auction_end(item)