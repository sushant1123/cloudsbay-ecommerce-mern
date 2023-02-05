import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const createPaymentIntent = async (authtoken) => {
	return await axios.post(`${REACT_APP_API_URL}/create-payment-intent`, {}, { headers: { authtoken } });
};
