from datetime import datetime
from models import db, BidItem, Bid  # Assume appropriate models are imported

def check_auctions():
    current_time = datetime.utcnow()
    # Query BidItems whose auction end time has passed but not yet marked as processed
    bid_items = BidItem.query.filter(BidItem.auction_end_time <= current_time, BidItem.processed == False).all()

    for item in bid_items:
        process_auction_end(item)

def process_auction_end(bid_item):
    # Here you would implement the logic to handle the end of an auction
    # For example, determine the highest bid and mark the winner
    highest_bid = Bid.query.filter_by(bid_item_id=bid_item.id).order_by(Bid.bid_amount.desc()).first()
    if highest_bid:
        print(f"Highest bid for item {bid_item.id} is {highest_bid.bid_amount} by user {highest_bid.bidder_id}")
        # Implement logic to mark the item as processed or notify users, etc.
    # bid_item.processed = True  # Mark the bid item as processed to avoid reprocessing
    db.session.commit()
