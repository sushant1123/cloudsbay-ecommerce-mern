import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../api's/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/orders/Invoice";
import ProductsTable from "../../components/orders/ProductsTable";

const History = () => {
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);
	const { user } = useSelector((state) => state);

	const loadUserOrders = async () => {
		try {
			setLoading(true);
			const response = await getUserOrders(user?.token);
			let { userOrders } = response.data;
			console.log(JSON.stringify(userOrders, null, 4));
			setOrders(userOrders);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const showOrderInTable = (order) => {
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

	const showPDFDownloadLink = (order) => {
		return (
			<PDFDownloadLink
				document={<Invoice order={order} />}
				className="btn btn-sm btn-block btn-outline-primary"
				fileName="invoice.pdf"
			>
				PDF Download
			</PDFDownloadLink>
		);
	};

	const showAllOrders = () => {
		return orders.map((order, i) => (
			<div key={i} className="m-5 p-3 card">
				<ShowPaymentInfo order={order} />
				{/* {showOrderInTable(order)} */}
				<ProductsTable order={order} />
				<div className="row">
					<div className="col">{showPDFDownloadLink(order)}</div>
				</div>
			</div>
		));
	};

	useEffect(() => {
		loadUserOrders();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col text-center">
					{loading ? <h4>Loading...</h4> : null}
					{!loading ? (
						<h4>{orders.length > 0 ? "User History Page" : "No purchase orders found"}</h4>
					) : null}
					{showAllOrders()}
				</div>
			</div>
		</div>
	);
};

export default History;
