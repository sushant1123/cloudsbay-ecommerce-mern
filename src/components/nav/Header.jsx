import React, { useState } from "react";
import { Menu } from "antd";
import { SettingOutlined, AppstoreOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
	const [current, setCurrent] = useState("home");

	const items = [
		{
			label: <Link to="/">Home</Link>,
			key: "home",
			icon: <AppstoreOutlined />,
			style: { display: "flex", alignItems: "center", justifyContent: "center" },
		},
		{
			label: "Username",
			key: "SubMenu",
			icon: <SettingOutlined />,
			// style: { display: "flex", alignItems: "center", justifyContent: "center" },
			children: [
				{
					label: "Option 1",
					key: "setting:1",
				},
				{
					label: "Option 2",
					key: "setting:2",
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
