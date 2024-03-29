import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../api's/sub-category";

const SubCategoriesList = () => {
	const [subCategories, setSubCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const getAllSubCategories = async () => {
		try {
			setLoading(true);
			const { data } = await getSubCategories();
			setSubCategories(data.subCategories);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const showSubCategories = () => {
		return subCategories.map((subcat) => (
			<div key={subcat._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
				<Link to={`/sub-category/${subcat.slug}`}>{subcat.name}</Link>
			</div>
		));
	};

	useEffect(() => {
		getAllSubCategories();
	}, []);

	return (
		<div className="container">
			<div className="row">
				{loading && <h4 className="text-center">Loading.....</h4>}
				{!loading && subCategories.length > 0 && showSubCategories()}
			</div>
		</div>
	);
};

export default SubCategoriesList;
