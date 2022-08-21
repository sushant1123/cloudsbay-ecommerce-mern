import React from "react";

const LocalSearch = ({ value, setValue }) => {
	const handleInputChange = (e) => {
		e.preventDefault();
		setValue(e.target.value.toLowerCase());
	};

	return (
		<div className="pt-4 pb-4">
			<input
				type="text"
				placeholder="Filter"
				className="form-control"
				value={value}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default LocalSearch;
