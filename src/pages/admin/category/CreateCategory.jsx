import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

import AdminNav from "../../../components/nav/AdminNav";

import { createCategory, removeCategory, getCategories } from "../../../api's/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Category = () => {
	const [category, setCategory] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [categoryLoading, setCategoryLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const handleCategorySubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await createCategory(category, user.token);
			setLoading(false);

			toast.success(`${response.data.message}}`);
			setCategory("");
			loadCategories();
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
						required
						disabled={loading || categoryLoading}
						autoFocus={!loading && !categoryLoading}
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
		try {
			const response = await getCategories();
			const { categories } = response.data;
			setAllCategories(categories);
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const handleRemoveCategory = async (slug) => {
		setLoading(true);
		if (window.confirm("Are you sure you want to delete?")) {
			try {
				const response = await removeCategory(slug, user.token);
				setLoading(false);
				toast.success(response.data.message);
				loadCategories();
			} catch (error) {
				setLoading(true);
				console.log(error.response.data);
				toast.error(error.response.data.message);
			}
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

					{!categoryLoading &&
						allCategories.map((cat, index) => (
							<div key={index} className="alert alert-secondary">
								{cat.name}
								<span
									className="btn btn-sm float-end"
									onClick={() => handleRemoveCategory(cat.slug)}
								>
									<DeleteOutlined className="text-danger" />
								</span>
								<Link to={`/admin/category/${cat.slug}`}>
									<span className="btn btn-sm float-end">
										<EditOutlined className="text-warning" />
									</span>
								</Link>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Category;
