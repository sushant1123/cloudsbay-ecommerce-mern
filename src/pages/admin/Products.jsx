import React from "react";
import AdminNav from "../../components/nav/AdminNav";

const Products = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">Admin Products</div>
			</div>
		</div>
	);
};

export default Products;
