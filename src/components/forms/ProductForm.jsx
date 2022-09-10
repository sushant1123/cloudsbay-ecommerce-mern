import React from "react";
import { Button, Select } from "antd";

const { Option } = Select;

const ProductForm = ({
	productValues,
	handleSubmit,
	handleOnChange,
	onChangeCategoryHandler,
	showSubCategoryOptions,
	subCategoryOptions,
}) => {
	const {
		title,
		description,
		price,
		category,
		categories,
		subCategories,
		shipping,
		quantity,
		color,
		brand,
		images,
		colors,
		brands,
	} = productValues;

	const children = [];
	subCategoryOptions.map((cat) =>
		children.push(
			<Option key={cat._id} value={cat._id}>
				{cat.name}
			</Option>
		)
	);

	return (
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
					onChange={handleOnChange}
				/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<input
					type="text"
					className="form-control"
					name="description"
					id="description"
					value={description}
					onChange={handleOnChange}
				/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="price" className="form-label">
					Price
				</label>
				<input
					type="text"
					className="form-control"
					name="price"
					id="price"
					value={price}
					onChange={handleOnChange}
				/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="shipping" className="form-label">
					Shipping
				</label>
				<select
					name="shipping"
					id="shipping"
					className="form-select"
					value={shipping}
					onChange={handleOnChange}
				>
					<option>Please Select</option>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="quantity" className="form-label">
					Quantity
				</label>
				<input
					type="text"
					className="form-control"
					name="quantity"
					id="quantity"
					value={quantity}
					onChange={handleOnChange}
				/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<select
					name="category"
					id="category"
					className="form-select"
					value={category}
					onChange={onChangeCategoryHandler}
				>
					<option>Please Select</option>
					{categories.map((cat) => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>

			{showSubCategoryOptions && (
				<div className="form-group mb-3">
					<label htmlFor="subCategories" className="form-label">
						Sub Categories
					</label>
					<Select
						mode="multiple"
						allowClear
						id="subCategories"
						value={subCategories}
						style={{ width: "100%" }}
						placeholder="Please Select"
						onChange={(e) => {
							handleOnChange({ target: { name: "subCategories", value: e } });
						}}
					>
						{children}
					</Select>
					{/* <select
						name="subCategory"
						id="subCategory"
						className="form-select"
						value={subCategory}
						onChange={handleOnChange}
					>
						<option>Please Select</option>
						{subCategoryOptions.map((cat) => (
							<option key={cat._id} value={cat._id}>
								{cat.name}
							</option>
						))}
					</select> */}
				</div>
			)}

			<div className="form-group mb-3">
				<label htmlFor="color" className="form-label">
					Color
				</label>
				<select
					name="color"
					id="color"
					className="form-select"
					value={color}
					onChange={handleOnChange}
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
				<label htmlFor="brand" className="form-label">
					Brand
				</label>
				<select
					name="brand"
					id="brand"
					className="form-select"
					value={brand}
					onChange={handleOnChange}
				>
					<option>Please Select</option>
					{brands.map((b, index) => (
						<option key={index} value={b}>
							{b}
						</option>
					))}
				</select>
			</div>

			<Button type="primary" onClick={handleSubmit}>
				Save
			</Button>
		</form>
	);
};

export default ProductForm;
