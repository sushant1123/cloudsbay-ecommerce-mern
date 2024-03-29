import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllOrders, updateStatus } from "../../api's/admin";
import AdminNav from "../../components/nav/AdminNav";
import Orders from "../../components/orders/Orders";

const Dashboard = () => {
	const { user } = useSelector((state) => state);
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);

	const loadAllOrders = async () => {
		try {
			setLoading(true);
			const { data } = await getAllOrders(user.token);
			setLoading(false);
			setOrders(data.orders);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	const changeOrderStatusHandler = async (orderId, status) => {
		try {
			setLoading(true);
			const response = await updateStatus(orderId, status, user.token);
			if (response.status === 200) {
				toast.success("order updated successfully");
				loadAllOrders();
			} else {
				toast.error("order updation failed");
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadAllOrders();
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h2>Admin Dashboard</h2>
					<Orders orders={orders} handleStatusChange={changeOrderStatusHandler} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
