import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: { text: "", price: { start: 0, end: 0 }, categories: [], rating: 0 },
	reducers: {
		searchQuery: (state, action) => (state = { ...state, ...action.payload }),
	},
});

const { actions, reducer } = searchSlice;

export const { searchQuery } = actions;

export default reducer;
