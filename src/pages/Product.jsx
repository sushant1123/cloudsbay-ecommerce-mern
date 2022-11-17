import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";

import { getProduct, getRelated } from "../api's/product";

const Product = () => {
	// const { user } = useSelector((state) => state);

	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [productInfo, setProductInfo] = useState({});
	const [relatedProducts, setRelatedProducts] = useState([]);

	const params = useParams();
	// console.log({ params });

	const getProductInfo = async () => {
		try {
			setLoading(true);
			const response = await getProduct(params.slug);

			setProductInfo(response.data.product);
			getRelatedProducts(response.data.product._id);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	const getRelatedProducts = async (id) => {
		try {
			setLoading(true);
			const response = await getRelated(id);

			setRelatedProducts(response.data.relatedProducts || []);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error(`${error.response.data.message}`);
		}
	};

	useEffect(() => {
		getProductInfo();
		// eslint-disable-next-line
	}, [params]);

	return (
		<>
			<div className="container-fluid">
				<div className="row pt-4">
					<SingleProduct product={productInfo} />
				</div>

				<div className="row">
					<div className="col text-center pt-5 pb-5">
						<hr />
						<h4>Related Products</h4>
						<hr />
					</div>
				</div>

				<div className="row pb-5">
					{relatedProducts.length > 0 ? (
						relatedProducts.map((product) => (
							<div
								key={product._id}
								className="col-md-4 d-flex flex-column justify-content-center align-items-center"
							>
								<ProductCard product={product} />
							</div>
						))
					) : (
						<h3 className="col text-center">No products found</h3>
					)}
				</div>
			</div>
		</>
	);
};

export default React.memo(Product);
