import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from './slices';
const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
    },
});
export default store;
