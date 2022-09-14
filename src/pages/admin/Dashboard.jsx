import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";

import { getProducts } from "../../api's/product";

const Dashboard = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getProductsByCount = async () => {
			setLoading(true);
			try {
				const response = await getProducts(100);
				const { products } = response.data;
				console.log(products);
				setProducts(products);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};

		getProductsByCount();
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading && <h4 className="text-danger">Loading....!</h4>}
					{JSON.stringify(products)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
