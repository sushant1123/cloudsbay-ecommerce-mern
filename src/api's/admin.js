import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const getAllOrders = async (authtoken) => {
	return await axios.get(`${REACT_APP_API_URL}/admin/orders`, { headers: { authtoken } });
};

export const updateStatus = async (orderId, orderStatus, authtoken) => {
	return await axios.put(
		`${REACT_APP_API_URL}/admin/order-status`,
		{ orderId, orderStatus },
		{ headers: { authtoken } }
	);
};
