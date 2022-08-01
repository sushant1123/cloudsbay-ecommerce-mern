import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import {
	SettingOutlined,
	AppstoreOutlined,
	UserOutlined,
	LogoutOutlined,
	UserAddOutlined,
} from "@ant-design/icons";

import { auth } from "../../firebase";
import { logout } from "../../redux/index.actions";

const Header = () => {
	const [current, setCurrent] = useState("home");

	const dispatch = useDispatch();
	const history = useHistory();

	// const { email } = useSelector((state) => state.user);

	const logOut = async () => {
		try {
			await signOut(auth);
			dispatch(logout(null));
			history.push("/login");
		} catch (error) {
			console.log(error);
		}
	};

	const items = [
		{
			label: <Link to="/">Home</Link>,
			key: "home",
			icon: <AppstoreOutlined />,
			style: { display: "flex", alignItems: "center", justifyContent: "center" },
		},
		{
			label: "Username",
			// label: email.length ? email.split("@")[0] : "Username",
			key: "SubMenu",
			icon: <SettingOutlined />,
			children: [
				{
					label: "Option 1",
					key: "setting:1",
				},
				{
					label: "Option 2",
					key: "setting:2",
				},
				{
					label: "LogOut",
					icon: <LogoutOutlined />,
					style: { display: "flex", alignItems: "center", justifyContent: "left" },
					onClick: () => logOut(),
				},
			],
		},
		{
			label: <Link to="/login">Login</Link>,
			key: "login",
			icon: <UserOutlined />,
			style: { marginLeft: "auto", display: "flex", alignItems: "center", justifyContent: "center" },
		},
		{
			label: <Link to="/register">Register</Link>,
			key: "register",
			icon: <UserAddOutlined />,
			style: { display: "flex", alignItems: "center", justifyContent: "center" },
		},
	];

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	return <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
