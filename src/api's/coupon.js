import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const createCoupon = async (authtoken, coupon) => {
	return await axios.post(
		`${REACT_APP_API_URL}/coupon`,
		{ coupon },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const removeCoupon = async (authtoken, couponId) => {
	return await axios.delete(`${REACT_APP_API_URL}/coupon/${couponId}`, {
		headers: {
			authtoken,
		},
	});
};

export const getCoupons = async () => {
	return await axios.get(`${REACT_APP_API_URL}/coupons`);
};
