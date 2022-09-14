import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const createProduct = async (product, authtoken) => {
	console.log(product);
	return await axios.post(`${REACT_APP_API_URL}/product`, { ...product }, { headers: { authtoken } });
};

export const getProducts = async (count) => {
	return await axios.get(`${REACT_APP_API_URL}/products/${count}`);
};
