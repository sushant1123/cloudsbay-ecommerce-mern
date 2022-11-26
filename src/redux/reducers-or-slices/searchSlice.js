import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: { text: "", price: { start: 10, end: 5000 }, categories: [] },
	reducers: {
		searchQuery: (state, action) => (state = { ...state, ...action.payload }),
	},
});

const { actions, reducer } = searchSlice;

export const { searchQuery } = actions;

export default reducer;
