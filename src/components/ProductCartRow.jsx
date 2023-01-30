import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";

import { colors } from "../utils/utils";
import DefaultImage from "../images/default.png";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers-or-slices/cartSlice";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const ProductCartRow = ({ c }) => {
	const [count, setCount] = useState(c.count);
	const [color, setColor] = useState(c.color);
	const dispatch = useDispatch();

	const getProductPrice = (price) => {
		return new Intl.NumberFormat("en-IN").format(price);
	};

	const removeItemFromCart = () => {
		let cart = JSON.parse(localStorage.getItem("cart")) || [];
		if (cart) {
			cart = cart.filter((product) => product._id !== c._id);
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		dispatch(addToCart(cart));
	};

	useEffect(() => {
		if (c.color === color) return;

		let cart = JSON.parse(localStorage.getItem("cart")) || [];
		if (cart) {
			cart.map((product, i) => (product._id === c._id ? (cart[i].color = color) : cart));
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		dispatch(addToCart(cart));
	}, [color, c.color, c._id, dispatch]);

	useEffect(() => {
		if (c.count === count) return;

		if (count > c.quantity) {
			toast.error(`max available quantity ${c.quantity}`);
			return;
		}

		let cart = JSON.parse(localStorage.getItem("cart")) || [];
		if (cart) {
			cart.map((product, i) => (product._id === c._id ? (cart[i].count = count) : cart));
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		dispatch(addToCart(cart));
	}, [count, c.count, c._id, dispatch, c.quantity]);

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
			<td>
				<select
					className="form-select"
					id="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				>
					{colors.map((col, i) => (
						<option key={`col-${i}`} value={col}>
							{col}
						</option>
					))}
				</select>
			</td>
			<td>
				<input
					type="number"
					name="product_count"
					id="product_count"
					value={count}
					min="1"
					max={c.quantity}
					className="form-control"
					onChange={(e) => {
						if (e.target.value > c.quantity) {
							toast.error(`max available quantity ${c.quantity}`);
							return;
						}
						setCount(e.target.value);
					}}
				/>
			</td>
			<td className="text-center">
				{c.shipping === "Yes" ? (
					<CheckCircleOutlined className="text-success" />
				) : (
					<CloseCircleOutlined className="text-danger" />
				)}
			</td>
			<td className="text-center">
				<CloseOutlined className="text-danger pointer" onClick={removeItemFromCart} />
			</td>
		</tr>
	);
};

export default ProductCartRow;
