import { createSlice } from '@reduxjs/toolkit';
export default createSlice({
    name: 'search',
    initialState: {
        searchText: '',
    },
    reducers: {
        setSearch: (state, action) => {
            state.searchText = action.payload;
        },
    },
});
