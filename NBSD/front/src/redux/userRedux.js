import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
    userSlice.actions;
export default userSlice.reducer;
