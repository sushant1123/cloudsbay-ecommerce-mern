import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

import UserNav from "../../components/nav/UserNav";

import { getUsersWishlist, updateUsersWishlist } from "../../api's/user";

const WishList = () => {
	const [loading, setLoading] = useState(false);
	const [wishlist, setWishlist] = useState([]);

	const { user } = useSelector((state) => state);

	const loadUsersWishlist = async () => {
		try {
			setLoading(true);
			const response = await getUsersWishlist(user.token);
			console.log(response.data.wishlist);
			setWishlist(response.data.wishlist);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const handleUpdateUsersWishlist = async (productId) => {
		try {
			setLoading(true);
			const response = await updateUsersWishlist(user.token, productId);
			console.log(response.data.wishlist);
			loadUsersWishlist();

			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUsersWishlist();
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col-md-10">
					<h4 className="text-center mt-3">WishList</h4>
					{wishlist.map((p) => (
						<div
							key={p._id}
							className="alert alert-secondary d-flex align-items-center justify-content-between"
						>
							<Link to={`/product/${p.slug}`}>{p.title}</Link>
							<span onClick={() => handleUpdateUsersWishlist(p._id)} className="btn btn-sm">
								<DeleteOutlined className="text-danger" />
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default WishList;
