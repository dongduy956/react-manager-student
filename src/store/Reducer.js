import { SET_SEARCH_TEXT } from './contains';
export const initState = {
    searchText: '',
};
function Reducer(state, action) {
    switch (action.type) {
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload,
            };
       
        default:
            // eslint-disable-next-line no-throw-literal
            throw 'Invalid action.';
    }
}

export default Reducer;
