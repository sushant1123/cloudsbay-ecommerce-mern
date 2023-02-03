import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
	name: "Coupon",
	initialState: false,
	reducers: {
		isCouponApplied: (state, action) => (state = action.payload),
	},
});

const { actions, reducer } = couponSlice;

export const { isCouponApplied } = actions;

export default reducer;
