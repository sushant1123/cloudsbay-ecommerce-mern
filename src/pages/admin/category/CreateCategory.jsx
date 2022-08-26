import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

import { createCategory, removeCategory, getCategories } from "../../../api's/category";

const CreateCategory = () => {
	const [category, setCategory] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	// eslint-disable-next-line
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

	const searchedCategories = (search) => (cat) => {
		return cat.name.toLowerCase().includes(search);
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
						allCategories.filter(searchedCategories(search)).map((cat, index) => (
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

export default CreateCategory;
