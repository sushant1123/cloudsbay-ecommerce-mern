import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { signInWithEmailLink, updatePassword } from "firebase/auth";

import { auth } from "../../firebase";

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (
			localStorage.getItem("emailForRegistration") === undefined ||
			localStorage.getItem("emailForRegistration") === null
		) {
			history.push("/register");
		} else {
			setEmail(localStorage.getItem("emailForRegistration"));
		}
	}, [history]);

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		if (password.length < 8) {
			toast.error("Password must be atleast 8 characters long");
			return;
		}

		try {
			const result = await signInWithEmailLink(auth, email, window.location.href);

			if (result.user.emailVerified) {
				localStorage.removeItem("emailForRegistration");

				//get the currentUser
				let user = auth.currentUser;

				//update the password
				await updatePassword(user, password);

				//get token
				const idTokenResult = await user.getIdTokenResult();

				// console.log(idTokenResult);

				//redirect to home/dashboard
				history.push("/");
			}
		} catch (error) {
			console.log(error);
			toast.error(`Something went wrong. Please try again later.`, {
				theme: "colored",
			});
		}
	};

	const completeRegistrationForm = () => {
		return (
			<form onSubmit={handleRegisterSubmit} className="form">
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						name="email"
						id="email"
						value={email}
						readOnly
						// onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						placeholder="Enter Your Password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoFocus
						// pattern="(?=.8\d)(?=.*[A-Z])(?=.*[a-z]).{8,20}"
					/>
				</div>

				<button type="submit" className="btn btn-raised mt-2 fw-bold fs-16">
					Complete Registration
				</button>
			</form>
		);
	};

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Register Complete</h4>

					{completeRegistrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
