import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../api's/stripe";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import DefaultImage from "../../images/default.png";

import "../../stripe.css";
import { Link } from "react-router-dom";

const cardStyle = {
	style: {
		base: {
			color: "#32325d",
			fontFamily: "Arial, sans-serif",
			fontSmoothing: "antialiased",
			fontSize: "16px",
			"::placeholder": {
				color: "#32325d",
			},
		},
		invalid: {
			color: "#fa755a",
			iconColor: "#fa755a",
		},
	},
};

const StripeCheckout = ({ history }) => {
	//eslint-disable-next-line
	const dispatch = useDispatch();
	const { user, coupon } = useSelector((state) => state);

	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [processing, setProcessing] = useState("");
	const [clientSecret, setClientSecret] = useState("");

	const [cartTotal, setCartTotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [amountPayable, setAmountPayable] = useState(0);

	const stripe = useStripe();
	const elements = useElements();

	const callPaymentIntent = async () => {
		try {
			const response = await createPaymentIntent(user.token);
			setClientSecret(response.data.clientSecret);
			setCartTotal(response.data.amount);
			setDiscount(response.data.discount);
			setAmountPayable(response.data.amountPayable);
		} catch (error) {
			console.log(error);
			setClientSecret("");
		}
	};

	const handlePaymentSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		try {
			setProcessing(true);
			const confirmPaymentRes = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: e.target.name.value,
					},
				},
			});

			if (confirmPaymentRes.error) {
				setError(`Payment failed with ${confirmPaymentRes.error.message}`);
			} else {
				// console.log(JSON.stringify(confirmPaymentRes, null, 4));
				setError("");
				setSucceeded(true);
				setError("");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setProcessing(false);
		}
	};

	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	useEffect(() => {
		callPaymentIntent();
		//eslint-disable-next-line
	}, []);

	// const paymentElementOptions = {
	// 	layout: "tabs",
	// };

	return (
		<>
			{!succeeded && (
				<div>
					{coupon && discount !== 0 ? (
						<p className="alert alert-success">Coupon Applied</p>
					) : (
						<p className="alert alert-danger">No Coupon Applied</p>
					)}
				</div>
			)}
			<div className="text-center pb-5">
				<Card
					cover={
						<img
							src={DefaultImage}
							alt="default img"
							style={{ marginBottom: "-50px", height: "50px", objectFit: "cover" }}
						/>
					}
					actions={[
						<>
							<DollarOutlined className="text-info" /> <br /> Total: ₹{cartTotal}
						</>,
						<>
							<CheckOutlined className="text-info" /> <br /> Discount: ₹{discount}
						</>,
						<>
							<DollarOutlined className="text-info" /> <br /> Payable Amount: ₹{amountPayable}
						</>,
					]}
				/>
			</div>

			<form id="payment-form" className="stripe-form" onSubmit={handlePaymentSubmit}>
				{/* <PaymentElement id="payment-element" options={paymentElementOptions} onChange={handleChange} /> */}
				<CardElement id="card-element" options={cardStyle} onChange={handleChange} />
				<button
					type="submit"
					className="stripe-button"
					disabled={processing || disabled || succeeded}
					id="submit"
				>
					<span id="button-text">
						{processing ? <div className="spinner" id="spinner"></div> : "Pay"}
					</span>
				</button>
				<br />

				{error && <div id="payment-message">{error}</div>}

				{succeeded && (
					<>
						<hr />
						<p className={succeeded ? "result-message" : "result-message hidden"}>
							Payment Successful.{" "}
							<Link to={"/user/history"}>Click here to see to history.</Link>
						</p>
					</>
				)}
			</form>
		</>
	);
};

export default StripeCheckout;
