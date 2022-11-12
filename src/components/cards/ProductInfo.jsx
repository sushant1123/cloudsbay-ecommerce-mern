import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductInfo = ({ product }) => {
	console.log(product);
	const { price, category, subCategories, shipping, color, brand, sold, quantity } = product;
	return (
		<ul className="list-group list-group-light">
			<li className="list-group-item d-flex justify-content-between align-items-center">
				Price <span className="label label-default label-pill pull-xs-right">₹ {price}</span>
			</li>

			<li className="list-group-item d-flex justify-content-between align-items-center">
				Category{" "}
				<Link
					to={`category/${category?.slug}`}
					className="label label-default label-pill pull-xs-right"
				>
					{category?.name}
				</Link>
			</li>

			{subCategories && (
				<li className="list-group-item d-flex justify-content-between align-items-center">
					SubCategories{" "}
					{subCategories?.map((subs, id) => (
						<Link
							key={id}
							to={`sub-category/${subs?.slug}`}
							className="label label-default label-pill pull-xs-right"
						>
							{subs?.name}
						</Link>
					))}
				</li>
			)}

			<li className="list-group-item d-flex justify-content-between align-items-center">
				Shipping{" "}
				<span className="label label-default label-pill pull-xs-right">
					{shipping ? "Yes" : "No"}
				</span>
			</li>

			<li className="list-group-item d-flex justify-content-between align-items-center">
				Available quantity{" "}
				<span className="label label-default label-pill pull-xs-right">{quantity}</span>
			</li>

			<li className="list-group-item d-flex justify-content-between align-items-center">
				Sold <span className="label label-default label-pill pull-xs-right">{sold}</span>
			</li>

			<li className="list-group-item d-flex justify-content-between align-items-center">
				Color <span className="label label-default label-pill pull-xs-right">{color}</span>
			</li>

			<li className="list-group-item d-flex justify-content-between align-items-center">
				Brand <span className="label label-default label-pill pull-xs-right">{brand}</span>
			</li>
		</ul>
	);
};

export default ProductInfo;
