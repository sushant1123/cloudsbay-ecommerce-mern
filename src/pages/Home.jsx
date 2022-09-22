import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/Jumbotron";

import { getProducts } from "../api's/product";
import LoadingCard from "../components/cards/LoadingCard";

let count = 3;
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
			const response = await getProducts(count);
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
			<Jumbotron text={["New Arrivals", "Latest Products", "Best Sellers"]} />
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

export default Home;
