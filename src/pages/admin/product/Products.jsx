import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/nav/AdminNav";
import ProductCard from "../../../components/cards/ProductCard";

import { getProducts, deleteProduct } from "../../../api's/product";

const Products = () => {
	const { user } = useSelector((state) => state);

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

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

	useEffect(() => {
		getProductsByCount();
	}, []);

	const deleteProductBySlug = async (slug) => {
		let answer = window.confirm("Are you sure you want to delete this product?");
		if (answer) {
			setLoading(true);
			try {
				const response = await deleteProduct(slug, user?.token || "");
				toast.success(`${response.data.message}`);
				setLoading(false);
				getProductsByCount();
			} catch (error) {
				console.log(error);
				setLoading(false);
				toast.error(`${error.response.data.message}`);
			}
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading ? <h4 className="text-danger">Loading....!</h4> : <h4>All Products</h4>}

					<div className="row">
						{products.map((product) => (
							<div className="col-md-3 mb-3" key={product._id}>
								<ProductCard
									product={product}
									deleteProduct={deleteProductBySlug}
									loading={loading}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
