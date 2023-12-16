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
    }
})

export default userSlice.reducer