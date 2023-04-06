import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userCart } from "../api's/user";
import ProductCartRow from "../components/ProductCartRow";
import { setIsCOD } from "../redux/index.actions";

const Cart = ({ history }) => {
	const { user, cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	const getCurrencyFormatter = (arr = []) => {
		let total = 0;
		total = arr.reduce((acc, curr) => {
			let pr = curr.price * curr.count;
			return acc + pr;
		}, 0);
		return new Intl.NumberFormat("en-IN").format(total);
	};

	const saveOrderToDB = async () => {
		try {
			const response = await userCart(cart, user.token);
			if (response.data.ok) {
				console.log("cart saved to db");
				history.push("/checkout");
			}
		} catch (error) {
			console.log("cart save error", error);
		}
	};

	const saveCODOrderToDB = async () => {
		try {
			const response = await userCart(cart, user.token);
			if (response.data.ok) {
				dispatch(setIsCOD(true));
				console.log("cart saved to db");
				history.push("/checkout");
			}
		} catch (error) {
			console.log("cart save error", error);
		}
	};

	const showCartItems = () => {
		return (
			<table className="table align-middle mb-0">
				<thead className="bg-light">
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Brand</th>
						<th>Color</th>
						<th>Count</th>
						<th>Shipping</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{cart?.map((c, i) => (
						<ProductCartRow c={c} key={i} />
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="container-fluid">
			<div className="row mt-2">
				<div className="col-md-9">
					<h4>
						Cart / {cart.length} {cart.length > 1 ? "products" : "product"}
					</h4>
					{!cart.length ? (
						<h5>
							No Products in Cart. <Link to={"/shop"}>Continue Shopping</Link>{" "}
						</h5>
					) : (
						<>{showCartItems()}</>
					)}
				</div>

				<div className="col-md-3">
					<h4>Order Summary</h4>
					<hr />

					<p>Products</p>
					{cart.map((c, i) => (
						<div key={i}>
							<p>
								{c.title} × {c.count} = ₹{getCurrencyFormatter([{ ...c }])}
							</p>
						</div>
					))}
					<hr />

					<h6>Total: ₹{getCurrencyFormatter(cart)}</h6>
					<hr />

					{user ? (
						<>
							<button
								className="btn btn-sm btn-primary mt-2"
								onClick={saveOrderToDB}
								disabled={!cart.length}
							>
								Proceed to Checkout
							</button>
							<br />
							<button
								className="btn btn-sm btn-warning mt-2"
								onClick={saveCODOrderToDB}
								disabled={!cart.length}
							>
								Pay Cash on Delivery
							</button>
						</>
					) : (
						<button type="button" className="btn btn-link" data-mdb-ripple-color="dark">
							<Link
								to={{
									pathname: "/login",
									state: {
										from: "cart",
									},
								}}
							>
								Login to Checkout
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
