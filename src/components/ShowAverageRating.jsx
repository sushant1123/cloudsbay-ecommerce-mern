import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import StarRatings from "react-star-ratings";

const ShowAverageRating = ({ product }) => {
	const [averageStars, setAverageStars] = useState(0);

	useEffect(() => {
		if (product && product.ratings) {
			let ratingsArray = product.ratings;
			let totalRating = ratingsArray.reduce((acc, curr) => acc + (Number(curr.star) || 0), 0);
			let len = ratingsArray.length;

			let result = totalRating / len || 0;
			console.log({ result });
			setAverageStars(result);
		}
	}, [product]);
	return (
		<div className="text-center pt-1 pb-3">
			{product?.ratings?.length > 0 ? (
				<div className="d-flex justify-content-center">
					<span>
						<StarRatings
							rating={averageStars}
							starRatedColor="red"
							// changeRating={(newRating, name) => changeRating(newRating, name)}
							numberOfStars={5}
							starDimension="20px"
							starSpacing="5px"
							name={product._id}
						/>
					</span>
					<span className="ms-2 fs-6">({product?.ratings?.length})</span>
				</div>
			) : (
				<span className="fs-5">No ratings yet</span>
			)}
		</div>
	);
};

export default ShowAverageRating;
