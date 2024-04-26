import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import painting from '@/assets/painting.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';

import { viewListing } from '@/api/listingService'

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
        width: 60%;
    }
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

const Listing = () => {
    let { id } = useParams();
    const rating = 3.5

    const [listingData, setListingData] = useState({})

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await viewListing(id)
                console.log(data)
                setListingData(data)
            } catch (error) {
                console.error("fetching listing error", error)
            }
        }

        fetchListing()
    }, [])

  return (
    <Container>
        <ImageContainer>
            <Image src={listingData.image_url} />
        </ImageContainer>
        <TextContainer>
            <h1>{listingData.title}</h1>
            <h2>${listingData.price}</h2>
            <ReviewsContainer>
                <StarRating rating={rating} />
                <Line />
                <ReviewsText>5 Seller Reviews</ReviewsText>
            </ReviewsContainer>
            <p>Sold by {listingData.seller_id}</p>
            <p>{listingData.description}</p>
            <br />
            <p>Contact: Jack O'Donnell, jodonnell@princeton.edu</p>
        </TextContainer>
    </Container>
  )
}

export default Listing