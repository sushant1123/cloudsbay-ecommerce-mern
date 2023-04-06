import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, clearUserCart, saveUserAddress, applyCoupon, createCODOrder } from "../api's/user";
import { addToCart } from "../redux/reducers-or-slices/cartSlice";
import "react-quill/dist/quill.snow.css";
import { isCouponApplied } from "../redux/index.actions";

const Checkout = ({ history }) => {
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
	const [applyCouponError, setApplyCouponError] = useState("");
	const [address, setAddress] = useState("");
	const [coupon, setCoupon] = useState("");
	const [isAddressSaved, setIsAddressSaved] = useState(false);

	const { user, isCOD } = useSelector((state) => state);
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
		history.push("/payment");
	};

	const placeCODOrder = async () => {
		// history.push("/payment");
		try {
			const response = await createCODOrder(user.token, isCOD);
			console.log("COD order placed", response);

			//empty cart from redux, localstorage, storage,
			//reset coupon, reset COD
			//redirect user to history page
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const getCartDetails = async () => {
		try {
			const response = await getUserCart(user.token);
			let { products, cartTotal, totalAfterDiscount } = response.data;
			setProducts(products);
			setTotal(cartTotal);
			setTotalAfterDiscount(totalAfterDiscount);
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
			setTotalAfterDiscount(0);
			setCoupon("");
			toast.success("You have emptied your cart. Continue Shopping..");
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const applyDiscountCoupon = async () => {
		console.log("applied coupon, send to backend", coupon);
		try {
			const response = await applyCoupon(user.token, coupon);
			setTotalAfterDiscount(response.data.cartTotalAfterDiscount);
			dispatch(isCouponApplied(true));
			toast.success("Coupon applied successfully");
			setApplyCouponError("");
		} catch (error) {
			console.log(error);
			dispatch(isCouponApplied(false));
			setApplyCouponError(error.response.data.message);
		}
	};

	const showAddress = () => {
		return (
			<>
				<ReactQuill theme="snow" value={address} onChange={setAddress} />
				<button className="btn btn-primary mt-2" onClick={saveAddressToDB}>
					Save
				</button>
			</>
		);
	};

	const ShowProductSummary = () => {
		return (
			<>
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
			</>
		);
	};

	const showApplyCoupon = () => {
		return (
			<>
				<div className="form-group d-flex">
					<input
						type="text"
						className="form-control w-50"
						placeholder=""
						value={coupon}
						onChange={(e) => {
							setApplyCouponError("");
							setCoupon(e.target.value);
						}}
					/>

					<span className="text-danger fs-6 p-1 ms-2 w-100">{applyCouponError}</span>
				</div>
				<br />

				<button
					disabled={!coupon || !products.length}
					onClick={applyDiscountCoupon}
					className="btn btn-primary"
				>
					Apply
				</button>
			</>
		);
	};

	useEffect(() => {
		getCartDetails();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="row p-2">
			<div className="col-md-6">
				<h4>Delivery Address</h4>
				<hr />

				{showAddress()}
				<hr />

				<h4>Got Coupon?</h4>
				{showApplyCoupon()}
			</div>

			<div className="col-md-6">
				<h4>Order Summary</h4>
				<hr />

				<ShowProductSummary />
				<hr />

				<p>Cart Total: ₹ {getCurrencyFormatter(total)}</p>
				<hr />

				{totalAfterDiscount ? (
					<>
						<p className="bg-success text-white p-1">
							Discount Applied: Total Payable: ₹ {getCurrencyFormatter(totalAfterDiscount)}
						</p>
						<hr />
					</>
				) : null}

				<div className="row">
					<div className="col-md-6">
						{isCOD ? (
							<button
								className="btn btn-primary"
								disabled={!products.length || !isAddressSaved}
								onClick={placeCODOrder}
							>
								Place COD Order
							</button>
						) : (
							<button
								className="btn btn-primary"
								disabled={!products.length || !isAddressSaved}
								onClick={placeOrder}
							>
								Place Order
							</button>
						)}
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
