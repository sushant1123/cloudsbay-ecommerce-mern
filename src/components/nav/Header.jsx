import React, { useState } from "react";
import { Badge, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import {
	SettingOutlined,
	AppstoreOutlined,
	UserOutlined,
	LogoutOutlined,
	UserAddOutlined,
	ShoppingOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";

import { auth } from "../../firebase";
import { logout } from "../../redux/index.actions";

import Search from "../forms/Search";

const Header = () => {
	const [current, setCurrent] = useState("home");

	const dispatch = useDispatch();
	const history = useHistory();

	const { user, cart } = useSelector((state) => state);

	const logOut = async () => {
		try {
			await signOut(auth);
			dispatch(logout(null));
			history.push("/login");
		} catch (error) {
			console.log(error);
		}
	};

	const styleProps = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const items = [
		{
			label: <Link to="/">Home</Link>,
			key: "home",
			icon: <AppstoreOutlined />,
			style: styleProps,
		},
		{
			label: <Link to="/shop">Shop</Link>,
			key: "shop",
			icon: <ShoppingOutlined />,
			style: styleProps,
		},
		{
			label: (
				<Link to="/cart">
					<Badge count={cart.length} offset={[9, 0]}>
						Cart
					</Badge>
				</Link>
			),
			key: "cart",
			icon: <ShoppingCartOutlined />,
			style: styleProps,
		},

		{
			label: <Search />,
			key: "search",
			// icon: <Search />,
			style: { marginLeft: "auto" },
		},

		user && {
			label: user?.email ? user?.email.split("@")[0] : "Username",
			key: "SubMenu",
			icon: <SettingOutlined />,
			style: user ? { ...styleProps, marginLeft: "auto" } : styleProps,
			children: [
				user?.role === "subscriber" && {
					label: <Link to="/user/history">Dashboard</Link>,
					// key: "setting:1",
				},

				user?.role === "admin" && {
					label: <Link to="/admin/dashboard">Dashboard</Link>,
					// key: "setting:1",
				},

				user?.email && {
					label: "LogOut",
					icon: <LogoutOutlined />,
					style: { ...styleProps, justifyContent: "left" },
					onClick: () => logOut(),
				},
			],
		},

		!user && {
			label: <Link to="/login">Login</Link>,
			key: "login",
			icon: <UserOutlined />,
			style: { marginLeft: "auto", ...styleProps },
		},

		!user && {
			label: <Link to="/register">Register</Link>,
			key: "register",
			icon: <UserAddOutlined />,
			style: styleProps,
		},
	];

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	return <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
