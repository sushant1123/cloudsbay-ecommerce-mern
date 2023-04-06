import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const userCart = async (cart, authtoken) => {
	return await axios.post(
		`${REACT_APP_API_URL}/user/cart`,
		{ cart },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const getUserCart = async (authtoken) => {
	return await axios.get(`${REACT_APP_API_URL}/user/cart`, {
		headers: {
			authtoken,
		},
	});
};

export const clearUserCart = async (authtoken) => {
	return await axios.delete(`${REACT_APP_API_URL}/user/cart`, {
		headers: {
			authtoken,
		},
	});
};

export const saveUserAddress = async (authtoken, address) => {
	return await axios.post(
		`${REACT_APP_API_URL}/user/address`,
		{ address },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const applyCoupon = async (authtoken, coupon) => {
	return await axios.post(
		`${REACT_APP_API_URL}/user/cart/coupon`,
		{ coupon },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const createOrder = async (authtoken, stripeResponse) => {
	return await axios.post(
		`${REACT_APP_API_URL}/user/order`,
		{ stripeResponse },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const createCODOrder = async (authtoken, isCOD) => {
	return await axios.post(
		`${REACT_APP_API_URL}/user/cod-order`,
		{ isCOD },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const getUserOrders = async (authtoken) => {
	return await axios.get(`${REACT_APP_API_URL}/user/orders`, {
		headers: {
			authtoken,
		},
	});
};

export const addToUsersWishlist = async (authtoken, productId) => {
	return await axios.post(
		`${REACT_APP_API_URL}/user/wishlist`,
		{ productId },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const getUsersWishlist = async (authtoken) => {
	return await axios.get(`${REACT_APP_API_URL}/user/wishlist`, {
		headers: {
			authtoken,
		},
	});
};

export const updateUsersWishlist = async (authtoken, productId) => {
	return await axios.put(
		`${REACT_APP_API_URL}/user/wishlist/${productId}`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
