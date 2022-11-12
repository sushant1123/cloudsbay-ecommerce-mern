import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";

import DefaultImage from "../../images/default.png";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductInfo from "./ProductInfo";

const SingleProduct = ({ product }) => {
	const { title, images, description } = product;
	console.log(product);
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
				<Card
					actions={[
						<>
							<ShoppingCartOutlined
								key="delete"
								className="text-success"
								// onClick={() => deleteProduct(product.slug)}
							/>{" "}
							<br /> Add to Cart
						</>,
						//TODO add to wishlist
						<Link to={`/`}>
							<HeartOutlined className="text-info" /> <br /> Add to Wishiist
						</Link>,
						// <>
						// 	<StarOutlined
						// 		key="delete"
						// 		className="text-danger"
						// 		// onClick={() => deleteProduct(product.slug)}
						// 	/>{" "}
						// 	<br /> Leave a Review
						// </>,
					]}
				>
					{/* <Meta title={title} description={description} /> */}
					<ProductInfo product={product} />
				</Card>
			</div>
		</>
	);
};

export default SingleProduct;
