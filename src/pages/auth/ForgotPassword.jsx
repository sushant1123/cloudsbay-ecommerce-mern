import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useSelector } from "react-redux";

import { auth } from "../../firebase";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState("cdhcdhc@gmail.com");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => state);

	useEffect(() => {
		if (user && user.token) {
			history.push("/");
		}
	}, [user, history]);

	const handlePasswordResetSubmit = async (e) => {
		e.preventDefault();

		const actionConfig = {
			url: process.env.REACT_APP_FIREBASE_FORGOT_PASSWORD_REDIRECT_URL,
			handleCodeInApp: true,
		};

		setLoading(true);

		try {
			await sendPasswordResetEmail(auth, email, actionConfig);

			toast.success(`Email is sent to ${email}. Click the link to forgot the password`);

			console.log("password reset email sent");
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong. Please try again later.`);
		}

		setLoading(false);
		setEmail("");
	};

	const passwordResetForm = () => {
		return (
			<form onSubmit={handlePasswordResetSubmit} className="form">
				<div className="mb-4">
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoFocus
						placeholder="Email"
					/>
				</div>

				<Button
					type="primary"
					onClick={handlePasswordResetSubmit}
					size="large"
					disabled={!email}
					className="btn btn-raised fw-bold"
				>
					Click to Reset Password
				</Button>
			</form>
		);
	};

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading && <h4 className="text-danger">Loading.....</h4>}
					{!loading && <h4 className="text-danger">Forgot Password Form</h4>}
					<h4>Register</h4>

					{passwordResetForm()}

					<Link to="/login" className="fw-bold text-info float-end">
						Go to Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
