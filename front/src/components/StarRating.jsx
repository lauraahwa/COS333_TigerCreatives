import React, { memo } from 'react';
import Rating from 'react-rating';

const StarRating = memo(({ value, size, color, ...rest }) => {
  return (
    <Rating
      style={{
        fontSize: `${size}px`,
        color: color || 'gold',
      }}
      emptySymbol="fa fa-star-o fa-2x"
      fullSymbol="fa fa-star fa-2x"
      initialRating={value}
      {...rest}
    />
  );
});

export default StarRating;
