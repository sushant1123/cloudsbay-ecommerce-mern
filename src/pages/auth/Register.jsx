import React, { useEffect, useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { auth } from "../../firebase";

const Register = ({ history }) => {
	const [email, setEmail] = useState("");

	const { user } = useSelector((state) => state);

	useEffect(() => {
		if (user && user.token) {
			history.push("/");
		}
	}, [user, history]);

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		const actionConfig = {
			url: process.env.REACT_APP_FIREBASE_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};

		try {
			await sendSignInLinkToEmail(auth, email, actionConfig);

			toast.success(`Email is sent to ${email}. Click the link to complete your registration`);

			localStorage.setItem("emailForRegistration", email);
			console.log("registration email sent");
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong. Please try again later.`);
		}

		setEmail("");
	};

	const registrationForm = () => {
		return (
			<form onSubmit={handleRegisterSubmit} className="form">
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

				<button type="submit" className="btn btn-raised fw-bold">
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

					{registrationForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
