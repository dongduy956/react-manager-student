import * as httpRequest from '~/utils/httpRequest';
import authHeader from './authHeader';
import refreshTokenService from './refreshTokenService';

export const get = async (page, pagesize) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get('classes', {
            params: {
                page,
                pagesize,
            },
            headers: authHeader(),
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const getSelect = async () => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get(`classes/select`, {
            headers: authHeader(),
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const getByID = async (id) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get(`classes/${id}`, {
            headers: authHeader(),
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const del = async (id) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.del(`classes/${id}`, {
            headers: authHeader(),
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const search = async (q, page, pagesize) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get('classes/search', {
            params: {
                q,
                page,
                pagesize,
            },
            headers: authHeader(),
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const post = async (params = {}) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.post(
            'classes',
            {
                ...params,
            },
            {
                headers: authHeader(),
            },
        );
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const put = async (id, params = {}) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.put(
            `classes/${id}`,
            {
                ...params,
            },
            {
                headers: authHeader(),
            },
        );
        return res;
    } catch ({ response }) {
        return response;
    }
};
