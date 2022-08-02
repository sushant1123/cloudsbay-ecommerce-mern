import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";

const Home = ({ history }) => {
	const { user } = useSelector((state) => state);

	useEffect(() => {
		if (!user || !user.token) history.push("/login");
	}, [user, history]);

	return (
		<div>
			<p>Home</p>
		</div>
	);
};

export default Home;
