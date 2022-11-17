import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import DefaultImage from "../../images/default.png";

import ShowAverageRating from "../ShowAverageRating";

const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
	return (
		<>
			<ShowAverageRating product={product} />
			<Card
				hoverable
				style={{ width: 300, marginTop: 16 }}
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
					<>
						<ShoppingCartOutlined
							key="delete"
							className="text-danger"
							// onClick={() => deleteProduct(product.slug)}
						/>{" "}
						<br /> Add to Cart
					</>,
				]}
			>
				<Meta
					title={product.title}
					description={`${product.description?.substring(0, 100)}${
						product.description.length > 100 ? "..." : ""
					}`}
					style={{ height: 120 }}
				/>
			</Card>
		</>
	);
};

export default ProductCard;
