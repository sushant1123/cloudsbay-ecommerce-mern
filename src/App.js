import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { loggedInUser } from "./redux/index.actions";

import RegisterComplete from "./pages/auth/RegisterComplete";

import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const idToken = await user.getIdToken();
				// console.log(idToken);

				dispatch(loggedInUser({ email: user.email, token: idToken }));
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
			</Switch>
			<ToastContainer />
		</div>
	);
};

export default App;
