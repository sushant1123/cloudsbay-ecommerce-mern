import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { auth, googleAuthProvider } from "../../firebase";

import { sendSignInLinkToEmail } from "firebase/auth";

import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [email, setEmail] = useState("");

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		const actionConfig = {
			url: process.env.REACT_APP_FIREBASE_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};

		try {
			await sendSignInLinkToEmail(auth, email, actionConfig);

			toast.success(`Email is sent to ${email}. Click the link to complete your registration`, {
				theme: "colored",
			});

			localStorage.setItem("emailForSignIn", email);
			console.log("registration email sent");
		} catch (error) {
			console.log(error);
		}

		setEmail("");
	};

	const registrationForm = () => {
		return (
			<form onSubmit={handleRegisterSubmit} className="form">
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
					placeholder="Email"
				/>

				<button type="submit" className="btn btn-raised mt-2 fw-bold">
					Register
				</button>
			</form>
		);
	};

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Register</h4>

					<ToastContainer />

					{registrationForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
