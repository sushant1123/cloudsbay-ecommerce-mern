import React from "react";
import { Button } from "antd";

const CategoryForm = ({ category, setCategory, handleCategorySubmit, loading }) => {
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
					disabled={loading}
					autoFocus
				/>
			</div>

			<br />

			<Button type="primary" onClick={handleCategorySubmit} disabled={!category || loading}>
				Save
			</Button>
		</form>
	);
};

export default CategoryForm;
