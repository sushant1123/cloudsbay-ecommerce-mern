import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import { auth, googleAuthProvider } from "../../firebase";
import { loggedInUser } from "../../redux/index.actions";

const createOrUpdateUser = async (authToken) => {
	try {
		return await axios.post(
			process.env.REACT_APP_API,
			{},
			{
				headers: {
					authToken,
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
};

const Login = ({ history }) => {
	const [email, setEmail] = useState("sushantbahirat40@gmail.com");
	const [password, setPassword] = useState("12345678");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		if (user && user.token) {
			history.push("/");
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
			console.log("create-or-update-response", response);

			// dispatch(loggedInUser({ email: user.email, token }));

			// history.push("/");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
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
			console.log("create-or-update-response", response);

			dispatch(loggedInUser({ email: user.email, token }));
			history.push("/");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
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
