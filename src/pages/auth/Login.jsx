import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { auth, googleAuthProvider } from "../../firebase";
import { loggedInUser } from "../../redux/index.actions";

const Login = ({ history }) => {
	const [email, setEmail] = useState("sushantbahirat40@gmail.com");
	const [password, setPassword] = useState("1234567890");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const result = await signInWithEmailAndPassword(auth, email, password);

			const { user } = result;
			const token = await user.getIdToken();

			dispatch(loggedInUser({ email: user.email, token }));

			history.push("/");
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
					{/* 
						<Button
					type="primary"
					shape="round"
					onClick={handleLoginSubmit}
					icon={<MailOutlined />}
					size="large"
					block
					disabled={!email || password.length < 8}
				>
					Login with Email/Password
				</Button>
					 */}
				</div>
			</div>
		</div>
	);
};

export default Login;
