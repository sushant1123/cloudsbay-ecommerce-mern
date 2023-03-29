import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
	return (
		<div>
			<p>
				<span>Order Id: {order.paymentIntent.id}</span>
				{" / "}
				<span>Amount: ₹ {order.paymentIntent.amount}</span>
				{" / "}
				<span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
				{" / "}
				<span>Payment Method: {order.paymentIntent.payment_method_types[0]}</span>
				{" / "}
				<span>Payment Status: {order.paymentIntent.status}</span>
				{" / "}
				<span>Ordered On: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>

				{showStatus ? (
					<>
						{" / "}
						<br />
						<span className="badge bg-primary text-white">Status: {order.orderStatus}</span>
					</>
				) : null}
			</p>
		</div>
	);
};

export default ShowPaymentInfo;
