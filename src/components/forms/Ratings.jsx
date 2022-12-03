import React from "react";
import StarRatings from "react-star-ratings";

const Ratings = ({ stars, starClick }) => {
	return (
		<>
			<StarRatings
				// rating={stars}
				starHoverColor="red"
				starEmptyColor="red"
				changeRating={() => starClick(stars)}
				numberOfStars={stars}
				starDimension="20px"
				starSpacing="6px"
			/>
			<br />
		</>
	);
};

export default Ratings;
