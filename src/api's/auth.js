import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
	return await axios.post(
		process.env.REACT_APP_API,
		{},
		{
			headers: {
				authToken,
			},
		}
	);
};
