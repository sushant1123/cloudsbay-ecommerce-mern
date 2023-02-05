import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { getCoupons, removeCoupon, createCoupon } from "../../../api's/coupon";
import { DeleteOutlined } from "@ant-design/icons";

import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
	const [name, setName] = useState("");
	const [coupons, setCoupons] = useState([]);
	const [expiry, setExpiry] = useState(new Date());
	const [discount, setDiscount] = useState(0);
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const handleCouponSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const coupon = { name, expiry, discount };
			const response = await createCoupon(user.token, coupon);
			setLoading(false);
			if (response.status === 201) {
				loadAllCoupons();
			}
			setName("");
			setDiscount(0);
			setExpiry("");

			toast.success(`"${name}" is created`);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error(error.response?.data.message || "Something went wrong while creating a coupon");
		}
	};

	const loadAllCoupons = async () => {
		try {
			setLoading(true);
			const response = await getCoupons();
			setCoupons(response.data.coupons);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error(error.response?.data.message || "Something went wrong while getting all coupon");
		}
	};

	const handleRemoveCoupon = async (couponId) => {
		if (window.confirm("Delete coupon?")) {
			try {
				setLoading(true);
				const response = await removeCoupon(user.token, couponId);
				toast.success(`Coupon "${response.data.deletedCoupon.name}" successfully deleted`);
				loadAllCoupons();
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
				toast.error(error.response?.data.message || "Something went wrong while deleting a coupon");
			}
		}
	};

	useEffect(() => {
		loadAllCoupons();
	}, []);

	return (
		<div className="container">
			{loading ? <h4 className="text-danger">Loading...</h4> : <h4>Coupon</h4>}

			<form onSubmit={handleCouponSubmit}>
				<div className="form-group">
					<label htmlFor="" className="form-label">
						Coupon Name
					</label>

					<input
						type="text"
						className="form-control"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={loading}
						autoFocus
					/>
				</div>
				<br />

				<div className="form-group">
					<label htmlFor="" className="form-label">
						Coupon Discount (in %)
					</label>

					<input
						type="number"
						className="form-control"
						value={discount}
						onChange={(e) => setDiscount(e.target.value)}
						required
						disabled={loading}
					/>
				</div>
				<br />

				<div className="form-group">
					<label htmlFor="" className="form-label text-muted">
						Coupon Expiry Date
					</label>

					<DatePicker
						className="form-control w-auto"
						value={expiry}
						onChange={(date) => setExpiry(date)}
						required
						disabled={loading}
						selected={expiry}
					/>
				</div>
				<br />

				<button type="submit" className="btn btn-outlined-primary">
					Save
				</button>
			</form>
			<br />
			<br />

			{/* list of coupons */}
			<table className="table table-bordered ">
				<thead>
					<tr>
						<th>Name</th>
						<th>Expiry</th>
						<th>Discount (in %)</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{coupons.map((coupon) => (
						<tr key={coupon._id}>
							<td>{coupon.name}</td>
							<td>{new Date(coupon.expiry).toLocaleString()}</td>
							<td>{coupon.discount}</td>
							<td>
								<DeleteOutlined onClick={() => handleRemoveCoupon(coupon._id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CreateCoupon;
