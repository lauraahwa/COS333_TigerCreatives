import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';

import { makeBid, viewBidInfo, viewListing, buyNow, processAuction } from '@/api/listingService'
import { getReviews, getProfile} from '@/api/userService'
import { Button } from '@/components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 100px;
    margin-top: 50px;
    gap: 50px;

`

const ImageContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: auto;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    h1 {
        font-weight: 400;
        font-size: 2.5rem;
        line-height: 2.3rem;
    }

    h2 {
        margin-top: 10px;
        font-weight: 400;
        font-size: 1.5rem;
        color: var(--subtext-color);
    }

    p {
        width: 90%;
    }

    a {
        text-decoration: none;
    }

    a:hover{
        color: var(--subtext-color);
    }
`

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
    padding: 15px;           // Adds padding inside the container
    border: 1px solid #ccc;  // Adds a light gray border
    border-radius: 8px;      // Optionally round the corners of the border
    background-color: #f9f9f9; // Gives a light background color
`

const ReviewsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
`

const FullStar = styled(FontAwesomeIcon)`
  margin-right: 5px;

  path {
    fill: var(--accent-color)
  }
  
`;

const HalfStar = styled(FontAwesomeIcon)`
  margin-right: 5px;

  path {
    fill: var(--accent-color);
  }
`;

const EmptyStar = styled(FontAwesomeIcon)`
  margin-right: 5px;

  path {
    fill: #e3e3e3;
  }
`;

const Line = styled.div`
    margin: 0 1.5vw;
    border-left: 1px solid var(--subtext-color);
    height: 20px;
`

const ReviewsText = styled.p`
    font-size: 0.8rem;
    color: var(--subtext-color);
    font-weight: 400;
`

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <>
            {Array.from({ length: fullStars }, (_, index) => (
                <FullStar key={`full_${index}`} icon={fasStar} />
            ))}
            {halfStars === 1 && <HalfStar key="half" icon={faStarHalfAlt} />}
            {Array.from({ length: emptyStars }, (_, index) => (
                <EmptyStar key={`empty_${index}`} icon={farStar} />
            ))}
        </>
    );
}

const Subtext = styled.p`
    font-size: 0.8rem;
    color: var(--subtext-color);

`
const ButtonContainer = styled.div`
    width: auto;
    text-decoration: none;
`

const StyledButton = styled(Button)`
    margin: 10px 0 20px 0;
    font-size: 1rem;
    padding: 5px 10px;
`

const BidContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    gap: 10px;

    input {
        width: 25%;
    }
`

const SoldNotification = styled.div`
    padding: 10px;
    background-color: #6bb581;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin: 10px 0;
`;

//---------------------------------------------------------------------------

const Listing = () => {
    let { id } = useParams();
    const rating = 3.5;

    const [listingData, setListingData] = useState({});
    const [isAuction, setIsAuction] = useState(false);
    const [reviewsData, setReviewsData] = useState({ reviews: [], numberOfReviews: 0, avgRating: 0 });
    const [bidData, setBidData] = useState([]);
    const [userData, setUserData] = useState({});

    const [isBidActive, setIsBidActive] = useState(false);
    const [bid, setBid] = useState('');

    const [isSold, setIsSold] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await viewListing(id);
                setListingData(data);
                setIsAuction(data.is_auction);

                if (data.is_auction) {
                    fetchBidInfo()
                }
            } catch (error) {
                console.error("fetching listing error", error);
            }
        };

        const fetchBidInfo = async () => {
            try {
                const data = await viewBidInfo(id);
                setBidData(data);
            } catch (error) {
                console.error('Error fetching bid info', error);
            }
        };

        fetchListing();
    }, [id]);
    
    // get the user information
    useEffect(() => {
        const fetchUserData = async () => {
            if (!listingData.seller_id) return;

            try {
                const data = await getProfile(listingData.seller_id);
                setUserData(data);
            } catch (error) {
                console.error('Error getting user info', error);
            }
        };

        fetchUserData();
    }, [listingData]);

    useEffect(() => {
        const processReviews = (reviews) => {
            const numberOfReviews = reviews.length
            let totalRating = 0;

            if (numberOfReviews == null) {
                console.log("AHGHHHHFDJAKFH")
                return { 'numberOfReviews': 0, 'avgRating': 0 }
            }

            reviews.forEach(review => {
                totalRating += review.rating
            })

            const avgRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

            return { numberOfReviews, avgRating }
        }

        const fetchReviews = async () => {
            if (!listingData || !listingData.seller_id) {  // Check if userData and userData.id are valid
                console.log("User data not available yet");
                return;
            }

            try {
                const data = await getReviews(listingData.seller_id)
                console.log(data)
                const { numberOfReviews, avgRating } = processReviews(data)
                setReviewsData({ reviews: data, numberOfReviews, avgRating })
            } catch (error) {
                console.error("fetching reviews error", error)
            }
        }

        fetchReviews()
    }, [listingData])

    const createBid = async () => {
        const bidData = {
            'listing_id': id,
            'bid_amount': bid
        }

        try {
            const response = await makeBid(bidData)
            console.log(response)
            setBid('')
            setIsBidActive(false)
            alert("You successfully placed a bid for $" + response.bid_amount + "!");
            window.location.reload();
        } catch (error) {
            console.error('Error placing bid:', error)

            // Handle specific error messages from the server
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Error placing bid. Please try again.");
            }
        }

    }

    const handleProcessAuction = async () => {
        try {
            const response = await processAuction(id);
            console.log(response)

            alert(response.message + " The highest bidder was " + response.bidder_id);

        } catch (error) {
            console.error('Error processing auction:', error);
            alert('An error occurred while processing the auction.');
        }
    };

    const handleBuyNow = async () => {
        const listingId = id;
    
        try {
            const response = await buyNow(listingId);
    
            if (response.success) {
                alert('Purchase successful!');
                // PUT IN UI POP UP TO DISPLAY AND X OUT
            } else {
                alert(`Purchase Status: ${response.message}`);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            alert('An error occurred during the purchase. Please try again.');
        }
    };

  return (
    <Container>
        <ImageContainer>
            <Image src={listingData.image_url} />
        </ImageContainer>
        {isAuction ? (
            <TextContainer>
                <h1>{listingData.title}</h1>
                <h2>Starting Price: ${listingData.start_price}</h2>
                <Subtext>or Best Offer</Subtext>
                <br/>
                <Link to={`/seller/${listingData.seller_id}`}>
                    <a>Sold by Seller: {userData.first_name} {userData.last_name}</a>
                </Link>
                
                <ReviewsContainer>
                    <StarRating rating={reviewsData.avgRating} />
                    <Line />
                    <Link to={`/itemized-reviews/${listingData.seller_id}`}>
                        <ReviewsText>{reviewsData.numberOfReviews} Seller Reviews</ReviewsText>
                    </Link>
                </ReviewsContainer>

                <p style={{ marginBottom: '20px' }}>Auction end date: {bidData.auction_end_time} | Top bid: ${bidData.highest_bid}</p>

                <BidContainer>
                    {isBidActive ? 
                        <>
                        <label htmlFor="bid">Enter Bid Amount ($USD)</label>
                        <div>
                            <input
                                id="bid"
                                name="bid"
                                placeholder="Bid amount"
                                value={bid}
                                onChange={e => setBid(e.target.value)}
                                required
                            />
                        </div>
                        <ButtonContainer>
                            <StyledButton text="Place bid" onClick={createBid}/>
                        </ButtonContainer> </> : 
                    
                    <ButtonContainer>
                        <StyledButton text="Place bid" onClick={() => setIsBidActive(true)}/>
                        <StyledButton text="Process Auction" onClick={handleProcessAuction}/>
                    </ButtonContainer>
                    }
                </BidContainer>
                <ReviewsContainer>
                    <p>{listingData.description}</p>
                </ReviewsContainer>
                <br />
                <p>Contact: {userData.email_address}</p>
            </TextContainer>
        ) : (
            <TextContainer>
                {isSold && <SoldNotification>Item Sold!</SoldNotification>}
                <h1>{listingData.title}</h1>
                <h2>${listingData.price}</h2>
                <br />
                <Link to={`/seller/${listingData.seller_id}`}>
                    Sold by Seller: {userData.first_name} {userData.last_name}
                </Link>
                <ReviewsContainer>
                    <StarRating rating={rating} />
                    <Line />
                    <Link to={`/itemized-reviews/${listingData.seller_id}`}>
                        <ReviewsText>{reviewsData.numberOfReviews} Seller Reviews</ReviewsText>
                    </Link>
                </ReviewsContainer>
                <p>{listingData.description}</p>
                <br />
                <ButtonContainer>
                    <StyledButton text="Buy Now" onClick={handleBuyNow} />
                </ButtonContainer>
                <p>Contact: {userData.email_address}</p>
            </TextContainer>
        )}
        
    </Container>
  )
}

export default Listing