import React, { useState } from "react";
import { toast } from "react-toastify";
import { updatePassword } from "firebase/auth";

import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";

const Password = () => {
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handlePasswordChangeSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await updatePassword(auth.currentUser, password);

			toast.success("Password updated successfully");
			setLoading(false);
			setPassword("");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const passwordUpdateForm = () => {
		return (
			<form onSubmit={handlePasswordChangeSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="password" className="form-label">
						Your Password
					</label>
					<input
						type="password"
						className="form-control"
						name="new-password"
						id="new-password"
						value={password}
						// minLength="8"
						onChange={(e) => setPassword(e.target.value)}
						disabled={loading}
					/>
				</div>

				<button className="btn btn-primary" disabled={password.length < 8 || loading}>
					Update Password
				</button>
			</form>
		);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col align-items-center">
					{loading ? <h4 className="text-danger">Loading.....</h4> : <h4>User Password Update</h4>}
					{passwordUpdateForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
