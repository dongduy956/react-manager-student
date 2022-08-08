import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'auth',
    initialState: {
        authActive: {},
        pathUpdate: '',
    },
    reducers: {
        setAuthActive: (state, action) => {
            state.authActive = action.payload;
        },
        setPathUpdate: (state, action) => {
            state.pathUpdate = action.payload;
        },
    },
});
