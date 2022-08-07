import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const LoadingToRedirect = () => {
	const [count, setCount] = useState(5);
	const history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => --prevCount);
		}, 1000);

		count === 0 && history.push("/");

		return () => {
			clearInterval(interval);
		};
	}, [count, history]);

	return (
		<div className="container p-5 text-center">
			<h3>Redirecting you in {count}</h3>
			<Oval
				height={80}
				width={80}
				color="#4fa94d"
				visible={true}
				wrapperClass="d-flex justify-content-center"
				ariaLabel="oval-loading"
				secondaryColor="#4fa94d"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</div>
	);
};

export default LoadingToRedirect;
