import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/forms/StripeCheckout";
import { createPaymentIntent } from "../api's/stripe";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
	const [clientSecret, setClientSecret] = useState("");
	const { user } = useSelector((state) => state);

	const callPaymentIntent = async () => {
		try {
			const response = await createPaymentIntent(user.token);
			setClientSecret(response.data.clientSecret);
		} catch (error) {
			console.log(error);
			setClientSecret("");
		}
	};

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	useEffect(() => {
		callPaymentIntent();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="container p-5 text-center">
			<h3>Complete your purchase</h3>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<div className="col-md-8 offset-md-2">
						<StripeCheckout />
					</div>
				</Elements>
			)}
		</div>
	);
};

export default Payment;
