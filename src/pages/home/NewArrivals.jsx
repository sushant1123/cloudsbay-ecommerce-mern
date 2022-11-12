import React, { useState, useEffect } from "react";
import { Pagination } from "antd";

import ProductCard from "../../components/cards/ProductCard";
import LoadingCard from "../../components/cards/LoadingCard";

import { getEnhancedProductList, getProductsCount } from "../../api's/product";

let count = 3;
const NewArrivals = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(1);

	const loadAllProducts = async () => {
		try {
			setLoading(true);
			const response = await getEnhancedProductList("createdAt", "desc", page);
			setProducts(response.data.products);
			// console.log(response);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const getAllProductsCount = async () => {
		try {
			setLoading(true);
			const response = await getProductsCount();
			setProductsCount(response.data.count);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		loadAllProducts();
		// eslint-disable-next-line
	}, [page]);

	useEffect(() => {
		getAllProductsCount();
	}, []);

	return (
		<>
			<div className="container">
				<div className="row">
					{loading && <LoadingCard count={count} />}
					{!loading &&
						products.map((product) => (
							<div className="col-md-4" key={product._id}>
								<ProductCard product={product} loading={loading} />
							</div>
						))}
				</div>
			</div>

			<div className="row">
				<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
					<Pagination
						current={page}
						onChange={(value) => setPage(value)}
						defaultPageSize={3}
						total={productsCount}
					/>
				</nav>
			</div>
		</>
	);
};

export default NewArrivals;
