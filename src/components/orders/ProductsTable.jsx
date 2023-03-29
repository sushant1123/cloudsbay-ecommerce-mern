import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import React from "react";

const ProductsTable = ({ order }) => {
	return (
		<table className="table table-bordered">
			<thead className="bg-light">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Brand</th>
					<th scope="col">Color</th>
					<th scope="col">Count</th>
					<th scope="col">Shipping</th>
				</tr>
			</thead>
			<tbody>
				{order?.products.map((p, i) => {
					return (
						<tr key={i}>
							<td>
								<b>{p.product.title}</b>
							</td>
							<td>₹ {p.product.price}</td>
							<td>{p.product.brand}</td>
							<td>{p.product.color}</td>
							<td>{p.count}</td>
							<td>
								{p.product.shipping === "Yes" ? (
									<CheckCircleOutlined style={{ color: "green" }} />
								) : (
									<CloseCircleOutlined style={{ color: "red" }} />
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ProductsTable;
