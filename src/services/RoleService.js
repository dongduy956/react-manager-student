import * as httpRequest from '~/utils/httpRequest';
import authHeader from './authHeader';
import refreshTokenService from './refreshTokenService';

export const getByID = async (id) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get(`role/${id}`, { headers: authHeader() });
        return res;
    } catch ({ response }) {
        return response;
    }
};

export const getSelect = async () => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get(`role/select`, { headers: authHeader() });
        return res;
    } catch ({ response }) {
        return response;
    }
};
