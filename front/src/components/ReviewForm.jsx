import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Rating from 'react-rating';
import { Button, ButtonContainer } from '@/components'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStar as farStar } from '@fortawesome/free-solid-svg-icons';

import { createReview } from '@/api/userService'

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
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  cursor: pointer;
  margin-top: 20px; 

  &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
  }

  &:active {
      box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
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
`

const ReviewForm = () => {
  let { id } = useParams()
  const [rating, setRating] = useState(1)
  const [text, setText] = useState('')

  const handleSubmit = async (e) =>{
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
    console.log("Rating changed to:", newRating);
    setRating(newRating); 
  };

  return (
    <Container>
      <StarRating initialRating={rating} onChange={handleRatingChange} />
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <textarea
            id="text"
            name="text"
            placeholder="Review"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <StyledButton disabled={rating === 0} type="submit">
          Send
        </StyledButton>
      </form>
    </Container>
  );
};

export default ReviewForm;
