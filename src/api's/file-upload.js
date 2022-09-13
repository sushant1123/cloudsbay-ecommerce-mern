import axios from "axios";
import { getURL } from "./config";

const REACT_APP_API_URL = getURL();

export const uploadFile = async (image, authtoken) => {
	return await axios.post(`${REACT_APP_API_URL}/upload-images`, { image }, { headers: { authtoken } });
};

export const deleteFile = async (public_id, authtoken) => {
	return await axios.post(`${REACT_APP_API_URL}/delete-images`, { public_id }, { headers: { authtoken } });
};
