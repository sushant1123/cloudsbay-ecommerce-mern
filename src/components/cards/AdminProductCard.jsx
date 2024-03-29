import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DefaultImage from "../../images/default.png";

const { Meta } = Card;

const AdminProductCard = ({ product, deleteProduct, loading }) => {
	return (
		<Card
			hoverable
			style={{ width: 280 }}
			loading={loading}
			cover={
				<img
					alt={product.title}
					src={product.images[0]?.url || DefaultImage}
					style={{ height: "150px", objectFit: "cover", border: "1px solid #e2e2e2" }}
					className="p-1"
				/>
			}
			actions={[
				<Link to={`/admin/product/${product.slug}`}>
					<EditOutlined key="edit" className="text-warning" />
				</Link>,
				<DeleteOutlined
					key="delete"
					className="text-danger"
					onClick={() => deleteProduct(product.slug)}
				/>,
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
	);
};

export default AdminProductCard;
