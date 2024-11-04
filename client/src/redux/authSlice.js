import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAdmin: false
    },

    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.token = null;
            state.isAdmin = false;
        }
    }
})

export const { loginSuccess, logoutSuccess} = authSlice.actions;
export default authSlice.reducer;