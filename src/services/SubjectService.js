import * as httpRequest from '~/utils/httpRequest';
import authHeader from './authHeader';
import refreshTokenService from './refreshTokenService';
export const get = async (page, pagesize) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get('subject', {
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
        const res = await httpRequest.get(`subject/select`, {
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
        const res = await httpRequest.get(`subject/${id}`, {
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
        const res = await httpRequest.get('subject/search', {
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

export const del = async (id) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.del(`subject/${id}`, { headers: authHeader() });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const post = async (params = {}) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.post(
            'subject',
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
            `subject/${id}`,
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
