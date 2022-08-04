import * as httpRequest from '~/utils/httpRequest';
import authHeader from './authHeader';
import refreshTokenService from './refreshTokenService';
export const get = async (page, pagesize) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get('teacher', {
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
export const del = async (id) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.del(`teacher/${id}`, {
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
        const res = await httpRequest.get('teacher/search', {
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
            'teacher',
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
            `teacher/${id}`,
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
