import axios from 'axios';
import refreshTokenService from '~/services/refreshTokenService';
import Cookies from 'js-cookie';

import { configCookies } from '~/config';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
    async (config) => {
        const session = JSON.parse(Cookies.get(configCookies.cookies.login));

        if (session?.token) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${session?.token}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error),
);
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;

            const result = await refreshTokenService();

            if (result?.token) {
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result?.token}`,
                };
            }

            return axios(config);
        }
        return Promise.reject(error);
    },
);
export const get = async (path, options = {}) => {
    const res = await axios.get(path, options);
    return res.data;
};
export const del = async (path, options = {}) => {
    const res = await axios.delete(path, options);
    return res.data;
};
export const post = async (path, options = {}) => {
    const res = await axios.post(path, options);
    return res.data;
};
export const put = async (path, options = {}) => {
    const res = await axios.put(path, options);
    return res.data;
};
const httpRequestPrivate = axios;
export default httpRequestPrivate;
