import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import { loggedInUser } from "./redux/index.actions";
import { currentUser } from "./api's/auth";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Payment from "./pages/Payment";
import { LoadingOutlined } from "@ant-design/icons";

// import Header from "./components/nav/Header";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Home from "./pages/Home";
// import Product from "./pages/Product";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import Password from "./pages/user/Password";
// import WishList from "./pages/user/WishList";
// import AdminDashboard from "./pages/admin/Dashboard";
// import Products from "./pages/admin/product/Products";
// import Coupons from "./pages/admin/Coupons";
// import CreateCategory from "./pages/admin/category/CreateCategory";
// import UpdateCategory from "./pages/admin/category/UpdateCategory";
// import CreateSubCategory from "./pages/admin/sub-category/CreateSubCategory";
// import UpdateSubCategory from "./pages/admin/sub-category/UpdateSubCategory";
// import CreateProduct from "./pages/admin/product/CreateProduct";
// import UpdateProduct from "./pages/admin/product/UpdateProduct";
// import UserRoute from "./components/routes/UserRoute";
// import AdminRoute from "./components/routes/AdminRoute";
// import SideDrawer from "./components/drawer/SideDrawer";

// import Category from "./pages/category/Category";
// import SubCategory from "./pages/subCategory/SubCategory";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";

const Login = lazy(() => import("./pages/auth/Login"));
const Header = lazy(() => import("./components/nav/Header"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const WishList = lazy(() => import("./pages/user/WishList"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/product/Products"));
const Coupons = lazy(() => import("./pages/admin/Coupons"));
const CreateCategory = lazy(() => import("./pages/admin/category/CreateCategory"));
const UpdateCategory = lazy(() => import("./pages/admin/category/UpdateCategory"));
const CreateSubCategory = lazy(() => import("./pages/admin/sub-category/CreateSubCategory"));
const UpdateSubCategory = lazy(() => import("./pages/admin/sub-category/UpdateSubCategory"));
const CreateProduct = lazy(() => import("./pages/admin/product/CreateProduct"));
const UpdateProduct = lazy(() => import("./pages/admin/product/UpdateProduct"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Category = lazy(() => import("./pages/category/Category"));
const SubCategory = lazy(() => import("./pages/subCategory/SubCategory"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

const App = () => {
	const dispatch = useDispatch();

	const FallBack = () => {
		return (
			<div className="col text-center p-5">
				React Redux EC <LoadingOutlined /> MMERCE___
			</div>
		);
	};

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
		<Suspense fallback={<FallBack />}>
			<Header />
			<SideDrawer></SideDrawer>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/product/:slug" component={Product} />
				<Route exact path="/shop" component={Shop} />
				<Route path="/category/:slug" component={Category} />
				<Route path="/sub-category/:slug" component={SubCategory} />
				<Route path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route path="/register/complete" component={RegisterComplete} />
				<Route path="/forgot/password" component={ForgotPassword} />
				<Route exact path="/cart" component={Cart} />
				<UserRoute path="/user/history" component={History} />
				<UserRoute path="/user/password" component={Password} />
				<UserRoute path="/user/wishlist" component={WishList} />
				<UserRoute path="/checkout" component={Checkout} />
				<UserRoute path="/payment" component={Payment} />

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
		</Suspense>
	);
};

export default App;
