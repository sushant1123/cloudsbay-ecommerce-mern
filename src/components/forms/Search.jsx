import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { searchQuery } from "../../redux/index.actions";

const Search = () => {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => state);
	const { text } = search;

	const history = useHistory();

	const handleChange = (e) => {
		dispatch(
			searchQuery({ text: e.target.value, categories: [], rating: 0, price: { start: 0, end: 0 } })
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/shop?${text}}`);
	};

	return (
		<form
			className="form-inline d-flex justify-content-center align-items-center my-2 my-lg-0 pt-2"
			onSubmit={handleSubmit}
		>
			<input
				className="form-control ms-sm-2 border-0 outline-0"
				type="text"
				placeholder="Search..."
				value={text}
				onChange={handleChange}
				aria-describedby="search-addon"
			/>

			<span className="input-group-text border-0" id="search-addon">
				<SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
			</span>
		</form>
	);
};

export default Search;
