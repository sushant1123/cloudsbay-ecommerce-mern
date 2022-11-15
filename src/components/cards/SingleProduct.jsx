import React from "react";
import { Card, Tabs } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// import { useEffect } from "react";

import ProductInfo from "./ProductInfo";
import RatingModal from "../modals/RatingModal";
import DefaultImage from "../../images/default.png";

import { provideAReview } from "../../api's/product";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect } from "react";

const SingleProduct = ({ product }) => {
	const { title, images, description, ratings, _id, slug } = product;
	const { user } = useSelector((state) => state);

	const history = useHistory();

	const [star, setStar] = useState();
	const [averageStars, setAverageStars] = useState();
	const [comment, setComment] = useState("");
	const [show, setShow] = useState(false);

	const changeRating = (newRating, name) => {
		let number = Number(newRating) || 0;
		setStar(number);
	};

	const updateReview = async () => {
		try {
			if (!star) return;
			let response = await provideAReview(_id, { star, comment }, user.token);
			console.log(response);
			toast.success("review updated successfully");
			setShow(false);
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const handleReview = () => {
		if (!user) history.push({ pathname: "/login", state: { from: `/product/${slug}` } });
		else setShow(true);
	};

	useEffect(() => {
		if (ratings && user) {
			let existingRatingByUser = ratings.find(
				(rating) => rating.postedBy.toString() === user._id.toString()
			);
			if (existingRatingByUser) {
				setStar(existingRatingByUser.star);
				setComment(existingRatingByUser.comment);
			}
		}

		if (ratings) {
			let len = ratings.length;
			let total = ratings.reduce((acc, curr) => acc + Number(curr.star));
			setAverageStars(total / len);
		}
	}, [ratings, user]);

	return (
		<>
			<div className="col-md-7">
				{images && images.length > 0 ? (
					<Carousel autoPlay infiniteLoop>
						{images &&
							images.map((image) => <img key={image.public_id} src={image.url} alt={title} />)}
					</Carousel>
				) : (
					<Card
						cover={
							<img
								alt={title}
								src={DefaultImage}
								// style={{ height: "450px", objectFit: "cover", border: "1px solid #e2e2e2" }}
								className="mb-1 card-img"
							/>
						}
					/>
				)}

				<Tabs type="card">
					<Tabs.TabPane tab="Description" key="1">
						{description}
					</Tabs.TabPane>
					<Tabs.TabPane tab="More" key="2">
						Call us on 111 1111 111 for more information
					</Tabs.TabPane>
				</Tabs>
			</div>

			<div className="col-md-5">
				<h1 className="bg-info p-3">{title}</h1>

				<div className="d-flex justify-content-center align-items-center p-3">
					<StarRatings
						rating={averageStars}
						starRatedColor="blue"
						changeRating={(newRating, name) => changeRating(newRating, name)}
						numberOfStars={5}
						starDimension="30px"
						name={_id}
					/>
					<span className="ms-3 fs-5">({ratings?.length})</span>
				</div>

				<Card
					actions={[
						<>
							<ShoppingCartOutlined
								key="cart"
								className="text-success"
								// onClick={() => deleteProduct(product.slug)}
							/>{" "}
							<br /> Add to Cart
						</>,
						//TODO add to wishlist
						<Link to={`/`}>
							<HeartOutlined className="text-info" key="wishlist" /> <br /> Add to Wishiist
						</Link>,
						<div onClick={handleReview}>
							<StarOutlined
								key="review"
								className="text-danger"
								// onClick={() => deleteProduct(product.slug)}
							/>{" "}
							<br /> {user ? "Leave a Review" : "Login To Review"}
						</div>,
					]}
				>
					{/* <Meta title={title} description={description} /> */}
					<ProductInfo product={product} />
				</Card>
			</div>

			<div className="col">
				<RatingModal
					show={show}
					setShow={setShow}
					title={title}
					rating={star}
					comment={comment}
					updateReview={updateReview}
				>
					<StarRatings
						rating={star}
						starRatedColor="blue"
						changeRating={(newRating, name) => changeRating(newRating, name)}
						numberOfStars={5}
						starDimension="30px"
						name={_id}
						className="justify-center"
					/>
					<label htmlFor="comment" className="input-label mt-3">
						Leave Your Comment
					</label>
					<textarea
						name="comment"
						id="comment"
						cols="20"
						rows="5"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className="input-control mt-1"
					></textarea>
				</RatingModal>
			</div>
		</>
	);
};

export default React.memo(SingleProduct);
