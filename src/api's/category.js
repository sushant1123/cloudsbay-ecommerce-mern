import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const getCategories = async () => {
	return await axios.get(`${REACT_APP_API_URL}/categories`);
};

export const getCategory = async (slug) => {
	return await axios.get(`${REACT_APP_API_URL}/category/${slug}`);
};

export const createCategory = async (category, authtoken) => {
	return await axios.post(`${REACT_APP_API_URL}/category`, { name: category }, { headers: { authtoken } });
};

export const updateCategory = async (slug, category, authtoken) => {
	return await axios.put(
		`${REACT_APP_API_URL}/category/${slug}`,
		{ name: category },
		{ headers: { authtoken } }
	);
};

export const removeCategory = async (slug, authtoken) => {
	return await axios.delete(`${REACT_APP_API_URL}/category/${slug}`, { headers: { authtoken } });
};

export const getSubCategory = async (_id) => {
	return await axios.get(`${REACT_APP_API_URL}/category/sub-category/${_id}`);
};
