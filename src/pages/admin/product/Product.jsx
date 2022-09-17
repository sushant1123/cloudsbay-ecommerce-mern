import React from "react";
import AdminNav from "../../../components/nav/AdminNav";

const Product = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">Admin Product</div>
			</div>
		</div>
	);
};

export default Product;
