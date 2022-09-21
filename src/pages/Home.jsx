import { LoadingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import { getProducts } from "../api's/product";
import ProductCard from "../components/cards/ProductCard";

const Home = ({ history }) => {
	// const { user } = useSelector((state) => state);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	if (!user || !user.token) history.push("/login");
	// }, [user, history]);

	const loadAllProducts = async () => {
		try {
			setLoading(true);
			const response = await getProducts(3);
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
			<div className="mt-4 p-5 bg-secondary text-white rounded d-flex justify-content-center">
				{loading && <LoadingOutlined />}
				{!loading && <h4>All Products</h4>}
			</div>
			<div className="container">
				<div className="row">
					<p>Home</p>
					{products.map((product) => (
						<div className="col-md-4" key={product._id}>
							<ProductCard product={product} loading={loading} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
