import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const get = async (path, options = {}) => {
    const res = await httpRequest.get(path, options);
    return res.data;
};
export const del = async (path, options = {}) => {
    const res = await httpRequest.delete(path, options);
    return res.data;
};
export const post = async (path, options = {}) => {
    const res = await httpRequest.post(path, options);
    return res.data;
};
export const put = async (path, options = {}) => {
    const res = await httpRequest.put(path, options);
    return res.data;
};
export default httpRequest;
