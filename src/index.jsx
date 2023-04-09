import React from "react";
import ReactDOM from "react-dom"; //by react v17
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { reduxStore } from "./redux/store";
import App from "./App.jsx";

import "./index.css";
import "antd/dist/antd.min.css";

const root = document.getElementById("root"); //by react v17

ReactDOM.render(
	<React.StrictMode>
		<Provider store={reduxStore}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	root
);
