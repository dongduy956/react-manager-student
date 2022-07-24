import axios from 'axios';
import authHeader from '~/services/AuthHeader';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const get = async (path, data = {}, token = '') => {
    const res = await httpRequest.get(path, data, authHeader(token));
    return res.data;
};
export const del = async (path, data = {}, token = '') => {
    const res = await httpRequest.delete(path, data, authHeader(token));
    return res.data;
};
export const post = async (path, data = {}, token = '') => {
    const res = await httpRequest.post(path, data, authHeader(token));
    return res.data;
};
export const put = async (path, data = {}, token = '') => {
    const res = await httpRequest.put(path, data, authHeader(token));
    return res.data;
};
export default httpRequest;
