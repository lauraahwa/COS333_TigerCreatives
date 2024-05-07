import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from 'react-rating';
import { getReviews } from '@/api/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const ContentArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    align-items: flex-start;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100%;
`;

const Heading = styled.h3`
    text-align: center;
    margin-top: 0;
    color: #333;
    margin-bottom: 15px;
    font-size: 30px;
`;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewText = styled.p`
    margin: 15px 0;
    color: #333;
    font-size: 18px;
`;

const FullStar = styled(FontAwesomeIcon)`
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

const SellerReviews = () => {
    let { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviews(id);
                setReviews(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching reviews');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [id]);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
      <Container>
          <Heading>Seller Reviews</Heading>
          <ContentArea>
              {reviews.map(review => (
                  <ReviewContainer key={review.id}>
                      <Rating
                          start={0}
                          stop={5}
                          step={1}
                          initialRating={review.rating}
                          readonly
                          emptySymbol={<EmptyStar icon={fasStar} />}
                          fullSymbol={<FullStar icon={farStar} />}
                      />
                      <ReviewText>{review.text}</ReviewText>
                  </ReviewContainer>
              ))}
          </ContentArea>
      </Container>
  );
};


export default SellerReviews;

