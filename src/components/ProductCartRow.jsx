import React, { useState } from "react";
import ModalImage from "react-modal-image";

import DefaultImage from "../images/default.png";

const ProductCartRow = ({ c }) => {
	const [count, setCount] = useState(c.count);

	const getProductPrice = (price) => {
		return new Intl.NumberFormat("en-IN").format(price);
	};

	return (
		<tr>
			<td>
				<div className="d-flex align-items-center">
					<div style={{ height: "100px", width: "100px", display: "flex", alignItems: "center" }}>
						<ModalImage
							small={c.images[0]?.url || DefaultImage}
							large={c.images[0]?.url || DefaultImage}
							alt={c.title}
						/>
					</div>
					<div className="ms-3">
						<p className="fw-bold mb-1">{c.title}</p>
					</div>
				</div>
			</td>
			<td>₹{getProductPrice(c.price)}</td>
			<td>{c.brand}</td>
			<td>{c.color}</td>
			<td>
				<input
					type="number"
					name="product_count"
					id="product_count"
					value={count}
					className="form-control"
					onChange={(e) => setCount(e.target.value)}
				/>
			</td>
			<td>{c.shipping}</td>
			<td>❌</td>
		</tr>
	);
};

export default ProductCartRow;
