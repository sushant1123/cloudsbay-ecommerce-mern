import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api's/category";

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const getAllCategories = async () => {
		try {
			setLoading(true);
			const { data } = await getCategories();
			console.log({ data });
			setCategories(data.categories);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const showCategories = () => {
		return categories.map((cat) => (
			<div key={cat._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
				<Link to={`/category/${cat.slug}`}>{cat.name}</Link>
			</div>
		));
	};

	useEffect(() => {
		getAllCategories();
	}, []);

	return (
		<div className="container">
			<div className="row">
				{loading && <h4 className="text-center">Loading.....</h4>}
				{!loading && categories.length > 0 && showCategories()}
			</div>
		</div>
	);
};

export default CategoryList;
