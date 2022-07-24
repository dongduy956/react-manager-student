import { SET_SEARCH_TEXT, SET_STATUS_LOGIN } from './contains';
export const initState = {
    searchText: '',
    login: false,
};
function Reducer(state, action) {
    switch (action.type) {
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload,
            };
        case SET_STATUS_LOGIN:
            return {
                ...state,
                login: action.payload,
            };
        default:
            // eslint-disable-next-line no-throw-literal
            throw 'Invalid action.';
    }
}

export default Reducer;
