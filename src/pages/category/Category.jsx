import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategory } from "../../api's/category";

const Category = () => {
	const params = useParams();
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState({});

	const getSingleCategory = async (slug) => {
		if (!slug) {
			toast.error("Something went wrong");
		}
		try {
			setLoading(true);
			const { data } = await getCategory(slug);
			console.log({ data });
			setCategory(data.category);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getSingleCategory(params.slug);
	}, []);

	return <div>{params.slug}</div>;
};

export default Category;
