import React, { useState } from "react";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
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
					<h4>Login</h4>

					{loginForm()}
				</div>
			</div>
		</div>
	);
};

export default Login;
