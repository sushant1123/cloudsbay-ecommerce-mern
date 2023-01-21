import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import userReducer from "./reducers-or-slices/userSlice";
import searchReducer from "./reducers-or-slices/searchSlice";
import cartReducer from "./reducers-or-slices/cartSlice";

const logger = createLogger();

export const reduxStore = configureStore({
	reducer: {
		user: userReducer,
		search: searchReducer,
		cart: cartReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
