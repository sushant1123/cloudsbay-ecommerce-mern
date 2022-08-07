import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingToRedirect from "./LoadingToRedirect";

import { currentAdmin } from "../../api's/auth";
import { useState } from "react";

const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => state);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (user && user.token) {
			const checkUserIsAdmin = async () => {
				try {
					const currentUser = await currentAdmin(user.token);
					if (currentUser.data.status === "success") {
						console.log("user is admin");
						setIsAdmin(true);
					} else {
						console.log("user is not an admin");
						setIsAdmin(false);
					}
				} catch (error) {
					console.log(error);
					setIsAdmin(false);
				}
			};
			checkUserIsAdmin();
		}
	}, [user]);

	return isAdmin ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
