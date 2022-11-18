import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import WishList from "./pages/user/WishList";
import AdminDashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/product/Products";
import Coupons from "./pages/admin/Coupons";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateSubCategory from "./pages/admin/sub-category/CreateSubCategory";
import UpdateSubCategory from "./pages/admin/sub-category/UpdateSubCategory";
import CreateProduct from "./pages/admin/product/CreateProduct";
import UpdateProduct from "./pages/admin/product/UpdateProduct";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import { auth } from "./firebase";
import { loggedInUser } from "./redux/index.actions";
import { currentUser } from "./api's/auth";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Category from "./pages/category/Category";

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
				<Route exact path="/product/:slug" component={Product} />
				<Route path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route path="/register/complete" component={RegisterComplete} />
				<Route path="/forgot/password" component={ForgotPassword} />
				<UserRoute path="/user/history" component={History} />
				<UserRoute path="/user/password" component={Password} />
				<UserRoute path="/user/wishlist" component={WishList} />
				<UserRoute path="/category/:slug" component={Category} />

				<AdminRoute path="/admin/dashboard" component={AdminDashboard} />
				<AdminRoute exact path="/admin/product" component={CreateProduct} />
				<AdminRoute path="/admin/product/:slug" component={UpdateProduct} />
				<AdminRoute path="/admin/products" component={Products} />
				<AdminRoute exact path="/admin/category" component={CreateCategory} />
				<AdminRoute exact path="/admin/category/:slug" component={UpdateCategory} />
				<AdminRoute exact path="/admin/sub-category" component={CreateSubCategory} />
				<AdminRoute path="/admin/sub-category/:slug" component={UpdateSubCategory} />
				<AdminRoute path="/admin/coupons" component={Coupons} />
			</Switch>
			<ToastContainer theme="colored" pauseOnFocusLoss={false} />
		</div>
	);
};

export default App;
