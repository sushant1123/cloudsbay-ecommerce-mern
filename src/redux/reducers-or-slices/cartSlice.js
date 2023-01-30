import { createSlice } from "@reduxjs/toolkit";

let initialState = [];
const cart = JSON.parse(localStorage.getItem("cart"));
if (cart) {
	initialState = cart;
}

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addToCart: (state, action) => (state = action.payload),
	},
});

const { actions, reducer } = cartSlice;

export const { addToCart } = actions;

export default reducer;
