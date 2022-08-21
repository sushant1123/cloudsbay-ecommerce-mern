import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import AdminNav from "../../../components/nav/AdminNav";

import { getCategory, updateCategory } from "../../../api's/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const UpdateCategory = ({ history, match }) => {
	const [category, setCategory] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const handleCategorySubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await updateCategory(match.params.slug, category, user.token);
			setLoading(false);

			toast.success(`${data.message}`);
			setCategory("");
			history.push(`/admin/category`);
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	const loadCategory = async () => {
		try {
			setLoading(true);
			const response = await getCategory(match.params.slug);
			const { category } = response.data;
			setCategory(category.name);
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategory();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading && <h4 className="text-danger">Loading....</h4>}
					{!loading && <h4>Update Category</h4>}
					<CategoryForm
						category={category}
						handleCategorySubmit={handleCategorySubmit}
						setCategory={setCategory}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default UpdateCategory;
