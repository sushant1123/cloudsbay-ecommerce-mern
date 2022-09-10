import axios from "axios";

export const getSubCategories = async () => {
	return await axios.get(`${process.env.REACT_APP_API}/sub-categories`);
};

export const getSubCategory = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`);
};

export const createSubCategory = async (data, authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/sub-category`,
		{ name: data.subCategory, parent: data.parent },
		{ headers: { authtoken } }
	);
};

export const updateSubCategory = async (slug, data, authtoken) => {
	return await axios.put(
		`${process.env.REACT_APP_API}/sub-category/${slug}`,
		{ name: data.subCategory, parent: data.parent },
		{ headers: { authtoken } }
	);
};

export const removeSubCategory = async (slug, authtoken) => {
	return await axios.delete(`${process.env.REACT_APP_API}/sub-category/${slug}`, {
		headers: { authtoken },
	});
};
