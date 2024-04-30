import React, { useState } from "react";
import StarRating from "./StarRating";

const initialFormState = { rating: 0 };

const ReviewForm = ({ setVisible, setReviews, reviews }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [disabled, setDisabled] = useState(true);

  const { rating } = formState;

  function handleSubmit(e) {
    e.preventDefault();
    setReviews([{ rating }, ...reviews]);
    setVisible(false);
    setFormState(initialFormState);
  }

  function handleReatingChange(rating) {
    setFormState({ rating });
    setDisabled(rating === 0);
  }

  return (
    <div>
      <StarRating onChange={handleRatingChange} value={rating} />
      <form className="form" onSubmit={handleSubmit}>
        <button className="btn" disabled={disabled} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
