import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../../redux/index.actions";

import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import DefaultImage from "../../images/default.png";

import ShowAverageRating from "../ShowAverageRating";

const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
	const [tooltip, setTooltip] = useState("Click to Add");
	// const { user, cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		let cart = [];
		let localCart = localStorage.getItem("cart");
		if (localCart) {
			cart = JSON.parse(localCart);
		}

		cart.push({ ...product, count: 1 });
		let unique = _.uniqWith(cart, _.isEqual);

		// console.log({ unique });
		localStorage.setItem("cart", JSON.stringify(unique));

		dispatch(addToCart(unique));
		setTooltip("Added");
	};

	return (
		<>
			<ShowAverageRating product={product} />
			<Card
				hoverable
				style={{ width: 340, marginTop: 16 }}
				cover={
					<img
						alt={product.title}
						src={product.images[0]?.url || DefaultImage}
						style={{ height: "150px", objectFit: "cover", border: "1px solid #e2e2e2" }}
						className="p-1"
					/>
				}
				actions={[
					<Link to={`/product/${product.slug}`}>
						<EyeOutlined key="edit" className="text-warning" /> <br /> View Product
					</Link>,
					<Tooltip title={tooltip}>
						<div onClick={handleAddToCart}>
							<ShoppingCartOutlined
								key="delete"
								className="text-danger"
								// onClick={() => deleteProduct(product.slug)}
							/>{" "}
							<br /> Add to Cart
						</div>
					</Tooltip>,
				]}
			>
				<Meta
					title={product.title}
					description={
						<>
							<div className="fs-6 fw-bolder">Price: {`₹${product.price}`}</div>
							<div>{`${product.description?.substring(0, 100)}${
								product.description.length > 100 ? "..." : ""
							}`}</div>
						</>
					}
					style={{ height: 120 }}
				/>
			</Card>
		</>
	);
};

export default ProductCard;
