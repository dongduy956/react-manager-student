import * as httpRequest from '~/utils/httpRequest';
import authHeader from './authHeader';
import refreshTokenService from './refreshTokenService';
export const get = async (page, pagesize) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.get('point', {
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
export const del = async (idStudent, idSubject, numberOfTimes) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.del(`point/${idStudent}&${idSubject}&${numberOfTimes}`, {
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
        const res = await httpRequest.get('point/search', {
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
            'point',
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
export const put = async (idStudent, idSubject, numberOfTimes, params = {}) => {
    try {
        await refreshTokenService();
        const res = await httpRequest.put(
            `point/${idStudent}&${idSubject}&${numberOfTimes}`,
            {
                ...params,
            },
            { headers: authHeader() },
        );
        return res;
    } catch ({ response }) {
        return response;
    }
};
