import React from "react";

const LocalSearch = ({ value, setValue }) => {
	const handleInputChange = (e) => {
		e.preventDefault();
		setValue(e.target.value.toLowerCase());
	};

	return (
		<input
			type="text"
			placeholder="Filter"
			className="form-control"
			value={value}
			onChange={handleInputChange}
		/>
	);
};

export default LocalSearch;
