import React, { useState, useEffect } from "react";

import ProductCard from "../../components/cards/ProductCard";

import { getEnhancedProductList } from "../../api's/product";
import LoadingCard from "../../components/cards/LoadingCard";

let count = 3;
const BestSellers = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const loadAllProducts = async () => {
		try {
			setLoading(true);
			const response = await getEnhancedProductList("sold", "desc", count);
			setProducts(response.data.products);
			// console.log(response);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		loadAllProducts();
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
		</>
	);
};

export default BestSellers;
