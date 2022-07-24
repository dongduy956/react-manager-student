import {  SET_SEARCH_TEXT, SET_STATUS_LOGIN } from './contains';
export const setSearchText = (payload) => ({ type: SET_SEARCH_TEXT, payload });
export const setStatusLogin = (payload) => ({ type: SET_STATUS_LOGIN, payload });
