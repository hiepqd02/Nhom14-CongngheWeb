import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    isAuthenticated: null,
    pending: true,
    loading: false,
    token: localStorage.getItem("token"),
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registrationStart: (state) => {
            state.pending = true;
        },
        registrationEnd: (state) => {
            state.pending = false;
        },
        loginStart: (state) => {
            state.pending = true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload.user;
            state.token = action.payload.user.token;
            localStorage.setItem("token", action.payload.user.token);
        },
        loginFailure: (state) => {
            state.pending = false;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
        loadStart: (state) => {
            state.pending = true;
        },
        loadSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload.user;
            state.token = localStorage.getItem("token");
            state.pending = false;
        },
        loadFailure: (state) => {
            state.pending = false;
        },
    },
});

export const {
    registrationStart,
    registrationEnd,
    loginStart,
    loginFailure,
    loginSuccess,
    loadStart,
    loadSuccess,
    loadFailure,
} = userSlice.actions;
export default userSlice.reducer;