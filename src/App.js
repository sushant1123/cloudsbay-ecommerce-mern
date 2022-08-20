import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import WishList from "./pages/user/WishList";
import AdminDashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Products from "./pages/admin/Products";
// import Category from "./pages/admin/Category";
import SubCategory from "./pages/admin/SubCategory";
import Coupons from "./pages/admin/Coupons";
import CreateCategory from "./pages/admin/category/CreateCategory";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import "react-toastify/dist/ReactToastify.css";

import { loggedInUser } from "./redux/index.actions";
import { currentUser } from "./api's/auth";
import { auth } from "./firebase";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			try {
				if (user) {
					const token = await user.getIdToken();

					const response = await currentUser(token);

					if (response.data.user) {
						const { name, role, picture, _id } = response.data.user;
						console.log("current-user-response", response.data);

						dispatch(loggedInUser({ _id, name, picture, role, email: user.email, token }));
					}
				}
			} catch (error) {
				console.log(error);
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route path="/register/complete" component={RegisterComplete} />
				<Route path="/forgot/password" component={ForgotPassword} />
				<UserRoute path="/user/history" component={History} />
				<UserRoute path="/user/password" component={Password} />
				<UserRoute path="/user/wishlist" component={WishList} />
				<AdminRoute path="/admin/dashboard" component={AdminDashboard} />
				<AdminRoute path="/admin/product" component={Product} />
				<AdminRoute path="/admin/products" component={Products} />
				<AdminRoute path="/admin/category" component={CreateCategory} />
				<AdminRoute path="/admin/sub-category" component={SubCategory} />
				<AdminRoute path="/admin/coupons" component={Coupons} />
			</Switch>
			<ToastContainer theme="colored" pauseOnFocusLoss={false} />
		</div>
	);
};

export default App;
