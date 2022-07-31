import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		loggedInUser: (state, action) => (state = action.payload),
		logout: (state, action) => (state = action.payload),
	},
});

const { actions, reducer } = userSlice;

export const { loggedInUser } = actions;

export default reducer;
