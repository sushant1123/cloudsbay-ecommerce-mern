import React from "react";
import { Card } from "antd";
import DefaultImage from "../../images/default.png";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product }) => {
	return (
		<Card
			hoverable
			style={{ width: 240 }}
			cover={
				<img
					alt={product.title}
					src={product.images[0]?.url || DefaultImage}
					style={{ height: "150px", objectFit: "cover", border: "1px solid #e2e2e2" }}
					className="p-1"
				/>
			}
			actions={[
				<EditOutlined key="edit" className="text-warning" />,
				<DeleteOutlined key="delete" className="text-danger" />,
			]}
		>
			<Meta
				title={product.title}
				description={`${product.description?.substring(0, 100)}${
					product.description.length > 100 ? "..." : ""
				}`}
			/>
		</Card>
	);
};

export default ProductCard;
