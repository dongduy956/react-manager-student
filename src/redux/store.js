import { configureStore } from '@reduxjs/toolkit';
import { authSlice, searchSlice } from './slices';
const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        auth: authSlice.reducer,
    },
});
export default store;
