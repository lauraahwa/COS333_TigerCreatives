import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Rating from 'react-rating';
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
  padding: 100px 0;
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
    }
    try {
      const response = await createReview(reviewData)
      console.log(response)
    } catch (error) {
      console.error('some error with review creation', error)
    }

  }

  // Explicitly define the onChange handler
  const handleRatingChange = (newRating) => {
    console.log("Rating changed to:", newRating); // Additional actions can be performed here
    setRating(newRating); // Update the state
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
        <button className="btn" disabled={rating === 0} type="submit">
          Send
        </button>
      </form>
    </Container>
  );
};

export default ReviewForm;
