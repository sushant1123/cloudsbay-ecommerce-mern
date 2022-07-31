import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import userReducer from "./reducers-or-slices/userSlice";

const logger = createLogger();

export const reduxStore = configureStore({
	reducer: {
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
