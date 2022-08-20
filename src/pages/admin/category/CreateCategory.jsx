import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import AdminNav from "../../../components/nav/AdminNav";

import { createCategory, removeCategory, getCategories } from "../../../api's/category";

const Category = () => {
	const [category, setCategory] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [categoryLoading, setCategoryLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const handleCategorySubmit = async (e) => {
		e.preventDefault();
		console.log("category", category);
		setLoading(true);
		try {
			const response = await createCategory(category, user.token);

			toast.success(`${response.data.message}}`);
			setCategory("");
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	const categoryForm = () => {
		return (
			<form>
				<div className="form-group">
					<label htmlFor="" className="form-label">
						Category Name
					</label>

					<input
						type="text"
						className="form-control"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						autoFocus
						required
					/>
				</div>

				<br />

				<Button type="primary" onClick={handleCategorySubmit} disabled={!category || loading}>
					Create
				</Button>
			</form>
		);
	};

	const loadCategories = async () => {
		setCategoryLoading(true);
		try {
			const response = await getCategories();
			// console.log(response);
			const { categories } = response.data;
			setAllCategories(categories);
			setCategoryLoading(false);
		} catch (error) {
			console.log(error);
			setCategoryLoading(false);
			toast.error(`${error.response.data.message}`);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading && <h4 className="text-danger">Loading....</h4>}
					{!loading && <h4>Create Category</h4>}
					{categoryForm()}

					<br />
					<hr />

					{categoryLoading && <h4 className="text-danger">Loading...</h4>}
					{!categoryLoading && !allCategories.length && (
						<h4 className="text-danger">No Categories found</h4>
					)}

					{!categoryLoading && allCategories.map((cat, index) => <div key={index}>{cat.name}</div>)}
				</div>
			</div>
		</div>
	);
};

export default Category;
