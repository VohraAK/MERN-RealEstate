import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    updated: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        // signIn reducers
        signInStart: (state) => { state.loading = true; state.updated = null },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.updated = null
        },
        signinFaliure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.updated = null
        },

        // updateUser reducers
        updateUserStart: (state) => { state.loading = true; state.updated = false },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.updated = true;
        },
        updateUserFaliure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.updated = false;
        },

        // deleteUser reducers
        deleteUserStart: (state) => { state.loading = true },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFaliure: (state, action) => {
            state.erorr = action.payload;
            state.loading = false;
        },

        //signIn reducers
        signOutStart: (state) => { state.loading = true },
        signOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFaliure: (state, action) => {
            state.erorr = action.payload;
            state.loading = false;
        },
    }
});

export const { signInStart, signInSuccess, signinFaliure, updateUserStart, updateUserSuccess, updateUserFaliure, deleteUserStart, deleteUserSuccess, deleteUserFaliure, signOutStart, signOutSuccess, signOutFaliure } = userSlice.actions;
export default userSlice.reducer;