import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import AdminNav from "../../../components/nav/AdminNav";
import LocalSearch from "../../../components/forms/LocalSearch";

import { createProduct } from "../../../api's/product";
import { getCategories } from "../../../api's/category";
import ProductForm from "../../../components/forms/ProductForm";

const initialProductValues = {
	title: "M1 Pro MacBook Pro",
	description: "This is a MacBook Pro laptop with M1 Pro chip.",
	price: "175000",
	category: "",
	categories: [],
	subCategory: [],
	shipping: "Yes",
	quantity: "100",
	color: "Black",
	brand: "Apple",
	images: [],
	colors: ["Black", "Brown", "Silver", "Blue", "White"],
	brands: ["Apple", "Dell", "Samsung", "Microsoft", "Lenovo", "Asus"],
};

const CreateProduct = () => {
	const [productValues, setProductValues] = useState(initialProductValues);
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;

		setProductValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleProductSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await createProduct(productValues, user.token);
			console.log({ response });
			setLoading(false);

			window.alert(`Product "${response.data.product.title}" created successfully.`);
			toast.success(`${response.data.message}`);

			setTimeout(() => {
				window.location.reload();
			}, 5000);
		} catch (error) {
			console.log(error);
			setLoading(false);
			if (error.response.status === 500) {
				toast.error("Something went wrong. Please try again later");
			} else {
				toast.error(`${error.response.data.message}`);
			}
		}
	};

	const loadCategories = async () => {
		try {
			const response = await getCategories();
			const { categories } = response.data;
			setProductValues((prevValues) => ({ ...prevValues, categories }));
		} catch (error) {
			console.log(error);
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
					{loading ? <h4 className="text-danger">Loading....</h4> : <h4>Create Product</h4>}

					<hr />

					<ProductForm
						handleSubmit={handleProductSubmit}
						handleOnChange={onChangeHandler}
						productValues={productValues}
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
