import React from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
};

const StarRating = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };
  
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index);
    }
  };
  
  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };
  
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = hoverRating ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <button
            key={index}
            type="button"
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} p-0.5 focus:outline-none`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
          >
            <Star
              className={`${sizeClasses[size]} ${filled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;