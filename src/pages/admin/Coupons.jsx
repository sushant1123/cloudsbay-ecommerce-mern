import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import CreateCoupon from "./coupon/CreateCoupon";

const Coupons = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					<CreateCoupon />
				</div>
			</div>
		</div>
	);
};

export default Coupons;
