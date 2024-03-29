import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const createProduct = async (product, authtoken) => {
	// console.log(product);
	return await axios.post(`${REACT_APP_API_URL}/product`, { ...product }, { headers: { authtoken } });
};

export const getProducts = async (count) => {
	return await axios.get(`${REACT_APP_API_URL}/products/${count}`);
};

export const getProduct = async (slug) => {
	return await axios.get(`${REACT_APP_API_URL}/product/${slug}`);
};

export const deleteProduct = async (slug, authtoken) => {
	// console.log({ slug });
	return await axios.delete(`${REACT_APP_API_URL}/product/${slug}`, { headers: { authtoken } });
};

export const updateProduct = async (slug, product, authtoken) => {
	// console.log({ slug });
	return await axios.put(`${REACT_APP_API_URL}/product/${slug}`, product, { headers: { authtoken } });
};

export const getEnhancedProductList = async (sort, order, page) => {
	// console.log({ sort, order, page });
	return await axios.post(`${REACT_APP_API_URL}/products`, { sort, order, page });
};

export const getProductsCount = async () => {
	return await axios.get(`${REACT_APP_API_URL}/products/total`);
};

export const provideAReview = async (id, rating, authtoken) => {
	// console.log({ id, rating, authtoken });
	return await axios.put(`${REACT_APP_API_URL}/product/rating/${id}`, rating, { headers: { authtoken } });
};

export const getRelated = async (id) => {
	return await axios.get(`${REACT_APP_API_URL}/product/related/${id}`);
};

export const fetchProductsByFilter = async (query) => {
	return await axios.post(`${REACT_APP_API_URL}/product/search/filters`, query);
};
