import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
	},
	author: {
		fontSize: 12,
		textAlign: "center",
		marginBottom: 40,
	},
	subtitle: {
		fontSize: 18,
		margin: 12,
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: "justify",
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	footer: {
		padding: "100px",
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
});

const Invoice = ({ order }) => {
	return (
		<Document>
			<Page size="A4" style={styles.body}>
				<Text style={styles.header}>
					~ {new Date(order.paymentIntent.created).toLocaleString()} ~
				</Text>
				<Text style={styles.title}>Order Invoice</Text>
				<Text style={styles.author}>React-Redux Ecommerce</Text>
				<Text style={styles.subtitle}>Order Summary</Text>
				<table>
					<thead>
						<tr>
							<Text>Title</Text>
							<Text>Price</Text>
							<Text>Quantity</Text>
							<Text>Brand</Text>
							<Text>Color</Text>
						</tr>
					</thead>
					<tbody>
						{order?.products.map((p, i) => {
							return (
								<tr key={i}>
									<Text>
										<b>{p.product.title}</b>
									</Text>
									<Text>₹ {p.product.price}</Text>
									<Text>{p.count}</Text>
									<Text>{p.product.brand}</Text>
									<Text>{p.product.color}</Text>
								</tr>
							);
						})}
					</tbody>
				</table>

				<Text style={styles.text}>
					<Text>Date: ~ {new Date(order.paymentIntent.created).toLocaleString()} ~</Text>
				</Text>
				<Text style={styles.text}>
					<Text>Order Id: ~ {order.paymentIntent.id} ~</Text>
				</Text>
				<Text style={styles.text}>
					<Text>Order Status: ~ {order.orderStatus} ~</Text>
				</Text>
				<Text style={styles.text}>
					<Text>Total Paid: ~ {order.paymentIntent.amount} ~</Text>
				</Text>

				<Text style={styles.footer}>~ Thank you for shopping with Us ~</Text>
			</Page>
		</Document>
	);
};

export default Invoice;
