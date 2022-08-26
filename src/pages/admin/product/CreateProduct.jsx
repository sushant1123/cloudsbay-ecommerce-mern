import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

import AdminNav from "../../../components/nav/AdminNav";
import LocalSearch from "../../../components/forms/LocalSearch";

import { createProduct } from "../../../api's/product";

const initialProductValues = {
	title: "",
	description: "",
	price: "",
	category: "",
	categories: [],
	subCategory: [],
	shipping: "",
	quantity: "",
	color: "",
	brand: "",
	images: [],
	colors: ["Black", "Brown", "Silver", "Blue", "White"],
	brands: ["Apple", "Dell", "Samsung", "Microsoft", "Lenovo", "Asus"],
};

const CreateProduct = () => {
	const [productValues, setProductValues] = useState(initialProductValues);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;

		setProductValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const {
		title,
		description,
		price,
		category,
		categories,
		subCategory,
		shipping,
		quantity,
		color,
		brand,
		images,
		colors,
		brands,
	} = productValues;

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					<h4>Create Product</h4>

					<hr />

					<form>
						<div className="form-group mb-3">
							<label htmlFor="title" className="form-label">
								Title
							</label>
							<input
								type="text"
								className="form-control"
								name="title"
								id="title"
								value={title}
								onChange={onChangeHandler}
							/>
						</div>

						<div className="form-group mb-3">
							<label htmlFor="title" className="form-label">
								Description
							</label>
							<input
								type="text"
								className="form-control"
								name="description"
								id="description"
								value={description}
								onChange={onChangeHandler}
							/>
						</div>

						<div className="form-group mb-3">
							<label htmlFor="title" className="form-label">
								Price
							</label>
							<input
								type="text"
								className="form-control"
								name="price"
								id="price"
								value={price}
								onChange={onChangeHandler}
							/>
						</div>

						<div className="form-group mb-3">
							<label htmlFor="title" className="form-label">
								Shipping
							</label>
							<select
								name="shipping"
								id="shipping"
								className="form-select"
								value={shipping}
								onChange={onChangeHandler}
							>
								<option>Please Select</option>
								<option value="No">No</option>
								<option value="Yes">Yes</option>
							</select>
						</div>

						<div className="form-group mb-3">
							<label htmlFor="title" className="form-label">
								Quantity
							</label>
							<input
								type="text"
								className="form-control"
								name="quantity"
								id="quantity"
								value={quantity}
								onChange={onChangeHandler}
							/>
						</div>

						<div className="form-group mb-3">
							<label htmlFor="title" className="form-label">
								Color
							</label>
							<select
								name="colors"
								id="colors"
								className="form-select"
								value={colors}
								onChange={onChangeHandler}
							>
								<option>Please Select</option>
								{colors.map((c, index) => (
									<option key={index} value={c}>
										{c}
									</option>
								))}
							</select>
						</div>

						<div className="form-group mb-3">
							<label htmlFor="title" className="form-label">
								Brand
							</label>
							<select
								name="brand"
								id="brand"
								className="form-select"
								value={brand}
								onChange={onChangeHandler}
							>
								<option>Please Select</option>
								{brands.map((b, index) => (
									<option key={index} value={b}>
										{b}
									</option>
								))}
							</select>
						</div>

						<Button type="primary" onClick={() => {}}>
							Save
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
