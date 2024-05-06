import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from 'react-rating';
import { Button } from '@/components';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStar as farStar } from '@fortawesome/free-solid-svg-icons';

import { createReview } from '@/api/userService';

const FullStar = styled(FontAwesomeIcon)`
  margin-right: 5px;
  path {
    fill: var(--accent-color)
  }
`;

const EmptyStar = styled(FontAwesomeIcon)`
  margin-right: 5px;
  path {
    fill: #e3e3e3;
  }
`;

const StyledButton = styled.button`
  padding: 8px 20px;
  border: 1px solid #3A3A3A;
  border-radius: 15px;
  background-color: #FFF;
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 20px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active {
    box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;  // Set width to 100%
  box-sizing: border-box; // Ensure padding is included within the width
  padding: 10px; // Add some padding for a better user experience
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StarRating = ({ onChange, initialRating }) => {
  return (
    <Rating
      start={0}
      stop={5}
      step={1}
      initialRating={initialRating}
      onChange={onChange}
      emptySymbol={<EmptyStar icon={fasStar} />}
      fullSymbol={<FullStar icon={farStar} />}
    />
  );
};

const Container = styled.div`
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const ReviewForm = () => {
  let { id } = useParams();
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      'seller_id': id,
      'rating': rating,
      'text': text
    };
    try {
      await createReview(reviewData);
      alert('Review submitted successfully!');
      setText('');
      setRating(1);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting the review. Please try again.');
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleGoBack = () => {
    navigate(`/seller/${id}`);
  };

  return (
    <Container>
      <StarRating initialRating={rating} onChange={handleRatingChange} />
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <p>Please leave your review below:</p>
          <StyledTextarea
            id="text"
            name="text"
            placeholder=''
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <p>*The TigerCreatives team highly suggests you to mention
          what item/service you purchased with this seller to be of
          most help to other users!
        </p>
        <ButtonContainer>
          <StyledButton disabled={rating === 0} type="submit">
            Submit Review
          </StyledButton>
          <StyledButton type="button" onClick={handleGoBack}>
            Go Back
          </StyledButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default ReviewForm;
