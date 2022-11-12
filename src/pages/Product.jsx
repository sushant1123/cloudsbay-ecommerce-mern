import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import SingleProduct from "../components/cards/SingleProduct";

import { getProduct } from "../api's/product";

const Product = () => {
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [productInfo, setProductInfo] = useState({});

	const params = useParams();
	console.log({ params });

	const getProductInfo = async () => {
		try {
			setLoading(true);
			const response = await getProduct(params.slug);
			setProductInfo(response.data.product);
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
			</div>
		</>
	);
};

export default Product;
