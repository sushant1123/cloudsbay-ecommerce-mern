import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";

import { getCategories } from "../../../api's/category";
import { getSubCategory, updateSubCategory } from "../../../api's/sub-category";

const UpdateSubCategory = ({ history, match }) => {
	const [category, setCategory] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	const [parentCategory, setParentCategory] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const handleCategorySubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await updateSubCategory(
				match.params.slug,
				{ subCategory: category, parent: parentCategory },
				user.token
			);
			setLoading(false);

			toast.success(`${data.message}`);
			setCategory("");
			setParentCategory("");
			history.push(`/admin/sub-category`);
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	const loadCategories = async () => {
		try {
			const response = await getCategories();
			const { categories } = response.data;
			setAllCategories(categories);
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const loadSubCategory = async () => {
		try {
			setLoading(true);
			const response = await getSubCategory(match.params.slug);
			const { category } = response.data;
			setCategory(category.name);
			setParentCategory(category.parent);

			setLoading(false);
		} catch (error) {
			console.log(error);
			toast.error(`${error.response && error.response.data.message}`);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
		loadSubCategory();

		// eslint-disable-next-line
	}, []);

	let parentCatName = allCategories.filter((cat) => cat._id === category.parent).name;
	console.log({ parentCatName });

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading && <h4 className="text-danger">Loading....</h4>}
					{!loading && <h4>Update Sub Category</h4>}

					<div className="form-group mb-3">
						<label htmlFor="category-select" className="form-label">
							Parent Category
						</label>
						<select
							name="category"
							id="category-select"
							className="form-select"
							onChange={(e) => setParentCategory(e.target.value)}
							value={parentCategory}
						>
							<option>Please Select a Parent Category</option>
							{allCategories &&
								allCategories.map((cat) => (
									<option key={cat._id} value={cat._id}>
										{cat.name}
									</option>
								))}
						</select>
					</div>

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

export default UpdateSubCategory;
