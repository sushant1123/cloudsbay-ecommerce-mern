export const getURL = () => {
	let api_hostname = "";
	if (window.location.hostname === "localhost") {
		api_hostname = import.meta.env.REACT_APP_API;
	} else if (window.location.hostname === "cloudsbay-client-sush.netlify.app") {
		api_hostname = import.meta.env.REACT_APP_API_PROD_URL;
	}

	return api_hostname;
};
