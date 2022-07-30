import React from "react";
import ReactDOM from "react-dom"; //by react v17
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import "antd/dist/antd.min.css";

const root = document.getElementById("root"); //by react v17

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	root
);
