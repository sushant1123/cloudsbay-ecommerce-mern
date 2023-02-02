import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, clearUserCart, saveUserAddress } from "../api's/user";
import { addToCart } from "../redux/reducers-or-slices/cartSlice";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [address, setAddress] = useState("");
	const [isAddressSaved, setIsAddressSaved] = useState(false);

	const { user } = useSelector((state) => state);
	const dispatch = useDispatch();

	const saveAddressToDB = async () => {
		try {
			console.log(address);
			const response = await saveUserAddress(user.token, address);
			if (response.data.ok) {
				setIsAddressSaved(true);
				toast.success("Address has been saved..");
			}
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const placeOrder = async () => {
		console.log("order placed");
	};

	const getCartDetails = async () => {
		try {
			const response = await getUserCart(user.token);
			let { products, cartTotal } = response.data;
			setProducts(products);
			setTotal(cartTotal);
			// console.log(JSON.stringify(response.data, null, 4));
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const getCurrencyFormatter = (price) => {
		return new Intl.NumberFormat("en-IN").format(price);
	};

	const emptyCart = async () => {
		try {
			// remove from local Storage
			localStorage.removeItem("cart");

			// remove from redux
			dispatch(addToCart([]));

			// remove from backend
			await clearUserCart(user.token);
			setProducts([]);
			setTotal(0);
			toast.success("You have emptied your cart. Continue Shopping..");
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	useEffect(() => {
		getCartDetails();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="row">
			<div className="col-md-6">
				<h4>Delivery Address</h4>
				<br />
				{/* <br /> */}
				{/* <textarea cols={100} rows={5} /> */}
				<ReactQuill theme="snow" value={address} onChange={setAddress} />
				<button className="btn btn-primary mt-2" onClick={saveAddressToDB}>
					Save
				</button>
				<hr />
				<h4>Got Coupon?</h4>
				coupon input and apply button
			</div>

			<div className="col-md-6">
				<h4>Order Summary</h4>
				<hr />

				<p>Products {products.length}</p>
				<hr />

				{products.map((p, i) => (
					<div key={i}>
						<p>
							{p.product.title} ({p.color}) × {p.count} = ₹{" "}
							{getCurrencyFormatter(p.count * p.product.price)}
						</p>
					</div>
				))}
				<hr />

				<p>Cart Total: ₹ {getCurrencyFormatter(total)}</p>
				<hr />

				<div className="row">
					<div className="col-md-6">
						<button
							className="btn btn-primary"
							disabled={!products.length || !isAddressSaved}
							onClick={placeOrder}
						>
							Place Order
						</button>
					</div>

					<div className="col-md-6">
						<button className="btn btn-primary" disabled={!products.length} onClick={emptyCart}>
							Empty Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
