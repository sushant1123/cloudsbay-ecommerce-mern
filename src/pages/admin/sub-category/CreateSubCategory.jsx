import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import AdminNav from "../../../components/nav/AdminNav";

import { createSubCategory, removeSubCategory, getSubCategories } from "../../../api's/sub-category";
import { getCategories } from "../../../api's/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CreateSubCategory = () => {
	const [category, setCategory] = useState("");
	const [parentCategory, setParentCategory] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	const [allSubCategories, setAllSubCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	// eslint-disable-next-line
	const [categoryLoading, setCategoryLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const handleCategorySubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await createSubCategory(
				{ subCategory: category, parent: parentCategory },
				user.token
			);
			setLoading(false);

			toast.success(`${response.data.message}`);
			setCategory("");
			loadSubCategories();
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	const loadSubCategories = async () => {
		try {
			const response = await getSubCategories();
			const { subCategories } = response.data;
			console.log({ subCategories });
			setAllSubCategories(subCategories);
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
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

	const handleRemoveCategory = async (slug) => {
		setLoading(true);
		if (window.confirm("Are you sure you want to delete?")) {
			try {
				const response = await removeSubCategory(slug, user.token);
				setLoading(false);
				toast.success(response.data.message);
				loadSubCategories();
			} catch (error) {
				setLoading(true);
				console.log(error.response.data);
				toast.error(error.response.data.message);
			}
		}
	};

	const searchedCategories = (search) => (cat) => {
		return cat.name.toLowerCase().includes(search);
	};

	useEffect(() => {
		loadCategories();
		loadSubCategories();
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading && <h4 className="text-danger">Loading....</h4>}
					{!loading && <h4>Create Sub Category</h4>}

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

					<hr />

					<LocalSearch value={search} setValue={setSearch} />

					<br />

					{categoryLoading && <h4 className="text-danger">Loading...</h4>}
					{!categoryLoading && !allCategories.length && (
						<h4 className="text-danger">No Categories found</h4>
					)}

					{!categoryLoading &&
						allSubCategories.filter(searchedCategories(search)).map((cat, index) => (
							<div key={index} className="alert alert-secondary">
								{cat.name}
								<span
									className="btn btn-sm float-end"
									onClick={() => handleRemoveCategory(cat.slug)}
								>
									<DeleteOutlined className="text-danger" />
								</span>
								<Link to={`/admin/sub-category/${cat.slug}`}>
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

export default CreateSubCategory;
