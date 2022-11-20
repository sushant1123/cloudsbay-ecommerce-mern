import React, { useState, useEffect } from "react";
import { getProducts, fetchProductsByFilter } from "../api's/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
	let { search } = useSelector((state) => state);
	let { text } = search;
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	//show products on page load
	const loadAllProducts = async () => {
		try {
			setLoading(true);
			const response = await getProducts(12);
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};
	useEffect(() => {
		loadAllProducts();
	}, []);

	//show products on user search input
	const getAllProductsBySearch = async (text) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ query: text });
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!text) {
			loadAllProducts();
			return;
		}

		let debounce = setTimeout(() => {
			getAllProductsBySearch(text);
		}, 500);

		return () => {
			clearTimeout(debounce);
		};
	}, [text]);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3">Search Filter Menu</div>
				<div className="col-md-9">
					{loading && <h4 className="text-danger">Loading...</h4>}
					{!loading && products.length > 0 && <h4 className="text-info">Products</h4>}

					{!loading && products.length < 1 && <p className="text-info">No Products Found</p>}

					<div className="row">
						{products.length > 0 &&
							products.map((p) => (
								<div className="col-md-4" key={p._id}>
									<ProductCard product={p} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
