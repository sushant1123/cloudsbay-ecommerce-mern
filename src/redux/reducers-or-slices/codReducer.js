import { createSlice } from "@reduxjs/toolkit";

const codSlice = createSlice({
	name: "cod",
	initialState: false,
	reducers: {
		setIsCOD: (state, action) => (state = action.payload),
	},
});

const { actions, reducer } = codSlice;

export const { setIsCOD } = actions;

export default reducer;
