import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { auth, googleAuthProvider } from "../../firebase";
import { loggedInUser } from "../../redux/index.actions";
import { createOrUpdateUser } from "../../api's/auth";

const roleBasedRedirect = (res, history) => {
	//check if it is an intended route
	let intended = history.location.state;
	if (intended) {
		history.push(intended.from);
	} else {
		if (res.data.user.role === "admin") {
			history.push("/admin/dashboard");
		} else {
			history.push("/user/history");
		}
	}
};

const Login = ({ history }) => {
	// const [email, setEmail] = useState("sushantbahirat40@gmail.com");
	// const [password, setPassword] = useState("12345678");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		let intended = history.location.state;
		if (intended) return;
		else {
			if (user && user.token) {
				history.push("/");
			}
		}
	}, [user, history]);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const result = await signInWithEmailAndPassword(auth, email, password);

			const { user } = result;
			const token = await user.getIdToken();

			const response = await createOrUpdateUser(token);
			const { name, role, picture, _id } = response.data.user;
			console.log("create-or-update-response", response.data);

			dispatch(loggedInUser({ _id, name, picture, role, email: user.email, token }));

			roleBasedRedirect(response, history);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	const handleGoogleLogin = async (e) => {
		e.preventDefault();
		try {
			const result = await signInWithPopup(auth, googleAuthProvider);

			const { user } = result;
			const token = await user.getIdToken();

			const response = await createOrUpdateUser(token);

			const { name, role, picture, _id } = response.data.user;
			console.log("create-or-update-response", response.data);

			dispatch(loggedInUser({ _id, name, picture, role, email: user.email, token }));

			roleBasedRedirect(response, history);
			// history.push("/");
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	const loginForm = () => {
		return (
			<form className="form">
				<div className="mb-4 form-group">
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoFocus
						placeholder="Email"
					/>
				</div>

				<div className="mb-4 form-group">
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
				</div>

				<Button
					type="primary"
					shape="round"
					onClick={handleLoginSubmit}
					className="mb-3"
					icon={<MailOutlined />}
					size="large"
					block
					disabled={!email || password.length < 8}
				>
					Login with Email/Password
				</Button>
			</form>
		);
	};

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? <h4 className="text-danger">Loading......</h4> : <h4>Login</h4>}

					{loginForm()}

					<Button
						type="danger"
						size="large"
						block
						shape="round"
						onClick={handleGoogleLogin}
						className="mb-3"
						icon={<GoogleOutlined />}
					>
						Login with Google
					</Button>
					<Link to="/forgot/password" className="float-end text-danger fw-bold">
						Forgot Password?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
