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
