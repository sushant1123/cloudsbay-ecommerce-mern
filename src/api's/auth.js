import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const createOrUpdateUser = async (authtoken) => {
	return await axios.post(
		`${REACT_APP_API_URL}/create-or-update-user`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const currentUser = async (authtoken) => {
	return await axios.post(
		`${REACT_APP_API_URL}/current-user`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const currentAdmin = async (authtoken) => {
	return await axios.post(
		`${REACT_APP_API_URL}/current-admin`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
