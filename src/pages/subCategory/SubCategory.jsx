import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSubCategory } from "../../api's/sub-category";
import ProductCard from "../../components/cards/ProductCard";

const SubCategory = () => {
	const params = useParams();
	const [loading, setLoading] = useState(false);
	const [subCategory, setSubCategory] = useState({});
	const [products, setProducts] = useState([]);

	const getSingleSubCategory = async (slug) => {
		if (!slug) {
			toast.error("Something went wrong");
		}
		try {
			setLoading(true);
			const { data } = await getSubCategory(slug);
			setSubCategory(data.subCategory);
			setProducts(data.products);
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
			setLoading(false);
		}
	};

	useEffect(() => {
		getSingleSubCategory(params.slug);
	}, [params.slug]);

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					{loading && (
						<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Loading....</h4>
					)}
					{!loading && products.length > 0 && (
						<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
							{products.length} {products.length > 1 ? "Products" : "Product"} in "
							{subCategory.name}" Sub Category
						</h4>
					)}{" "}
					{!loading && products.length === 0 && (
						<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
							No Products in "{subCategory.name}" Category
						</h4>
					)}
				</div>
			</div>

			<div className="row">
				{products.map((p) => (
					<div
						className="col-md-4 p-3 d-flex flex-column justify-content-center align-items-center"
						key={p._id}
					>
						<ProductCard product={p} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SubCategory;
