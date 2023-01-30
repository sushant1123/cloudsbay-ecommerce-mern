import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";

import { getProduct, updateProduct } from "../../../api's/product";
import { getCategories, getSubCategory } from "../../../api's/category";
import UpdateProductForm from "../../../components/forms/UpdateProductForm";
import { colors } from "../../../utils/utils";

const initialProductValues = {
	title: "",
	description: "",
	price: "",
	category: "",
	categories: [],
	subCategories: [],
	shipping: "",
	quantity: "",
	color: "",
	brand: "",
	images: [],
	colors: colors,
	brands: ["Apple", "Dell", "Samsung", "Microsoft", "Lenovo", "Asus"],
};

const UpdateProduct = ({ match, history }) => {
	const { user } = useSelector((state) => state);

	const [productValues, setProductValues] = useState(initialProductValues);
	const [categories, setCategories] = useState([]);
	const [subCategoryOptions, setSubCategoryOptions] = useState([]);
	const [showSubCategoryOptions, setShowSubCategoryOptions] = useState(false);
	const [loading, setLoading] = useState(false);

	const getProductBySlug = async () => {
		try {
			const response = await getProduct(match.params.slug);
			const { product } = response.data;
			console.log({ product });

			for (let i in initialProductValues) {
				initialProductValues[i] = product.hasOwnProperty(i) ? product[i] : initialProductValues[i];
			}
			setProductValues((prev) => ({ ...prev, ...product }));
			getSubCategoriesFromCategory(product.category._id);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProductBySlug();
		//eslint-disable-next-line
	}, [match.params]);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setProductValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const getSubCategoriesFromCategory = async (value) => {
		try {
			const response = await getSubCategory(value);
			const { subCategories } = response.data;
			setSubCategoryOptions(subCategories);
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const onChangeCategoryHandler = async (e) => {
		const { name, value } = e.target;
		console.log("category", value);
		setProductValues((prevValues) => ({ ...prevValues, [name]: value, subCategories: [] }));
		setShowSubCategoryOptions(true);

		getSubCategoriesFromCategory(value);
	};

	const handleProductUpdate = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			// return;
			const response = await updateProduct(match.params.slug, productValues, user.token);
			console.log({ response });
			setLoading(false);

			window.alert(`Product "${response.data.product.title}" updated successfully.`);
			toast.success(`${response.data.message}`);
			history.push(`/admin/product/${response.data.product.slug}`);
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
			setCategories(categories);
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
					{loading && <LoadingOutlined />}
					{!loading && <h4>Update Product</h4>}

					<hr />

					<FileUpload
						productValues={productValues}
						setProductValues={setProductValues}
						setLoading={setLoading}
					/>

					<hr />

					<UpdateProductForm
						handleSubmit={handleProductUpdate}
						handleOnChange={onChangeHandler}
						productValues={productValues}
						onChangeCategoryHandler={onChangeCategoryHandler}
						categories={categories}
						showSubCategoryOptions={showSubCategoryOptions}
						subCategoryOptions={subCategoryOptions}
					/>

					<hr />
				</div>
			</div>
		</div>
	);
};

export default UpdateProduct;
