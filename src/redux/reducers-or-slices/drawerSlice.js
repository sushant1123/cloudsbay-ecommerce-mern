import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
	name: "drawer",
	initialState: false,
	reducers: {
		setVisible: (state, action) => (state = action.payload),
	},
});

const { actions, reducer } = drawerSlice;

export const { setVisible } = actions;

export default reducer;
