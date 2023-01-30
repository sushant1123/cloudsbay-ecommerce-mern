import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DefaultImage from "../../images/default.png";
import { setVisible } from "../../redux/index.actions";

const SideDrawer = ({ children }) => {
	const dispatch = useDispatch();
	const { drawer, cart } = useSelector((state) => state);

	const imageStyle = {
		width: "100%",
		height: "70px",
		objectFit: "cover",
	};

	return (
		<Drawer
			visible={drawer}
			onClose={() => dispatch(setVisible(false))}
			className="text-center"
			title={`Cart | ${cart.length} Product(s)`}
		>
			{cart.map((c) => (
				<div key={c._id} className="row">
					<div className="col">
						<img src={c.images[0]?.url || DefaultImage} alt={c.title} style={imageStyle} />
						<p className="text-center bg-secondary text-light">
							{c.title} × {c.count}
						</p>
					</div>
				</div>
			))}
			<Link to={"/cart"}>
				<Button
					onClick={() => dispatch(setVisible(false))}
					className="text-center btn bg-primary text-light btn-primary btn-raised btn-block"
				>
					Go To Cart
				</Button>
			</Link>
		</Drawer>
	);
};

export default SideDrawer;
