import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const getSubCategories = async () => {
	return await axios.get(`${REACT_APP_API_URL}/sub-categories`);
};

export const getSubCategory = async (slug) => {
	return await axios.get(`${REACT_APP_API_URL}/sub-category/${slug}`);
};

export const createSubCategory = async (data, authtoken) => {
	return await axios.post(
		`${REACT_APP_API_URL}/sub-category`,
		{ name: data.subCategory, parent: data.parent },
		{ headers: { authtoken } }
	);
};

export const updateSubCategory = async (slug, data, authtoken) => {
	return await axios.put(
		`${REACT_APP_API_URL}/sub-category/${slug}`,
		{ name: data.subCategory, parent: data.parent },
		{ headers: { authtoken } }
	);
};

export const removeSubCategory = async (slug, authtoken) => {
	return await axios.delete(`${REACT_APP_API_URL}/sub-category/${slug}`, {
		headers: { authtoken },
	});
};
