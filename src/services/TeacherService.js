import * as httpRequest from '~/utils/httpRequest';
export const get = async (page, pagesize) => {
    const res = await httpRequest.get('teacher', {
        params: {
            page,
            pagesize,
        },
    });
    return res;
};
export const del = async (id) => {
    const res = await httpRequest.del(`teacher/${id}`);
    return res;
};
export const search = async (q, page, pagesize) => {
    const res = await httpRequest.get('teacher/search', {
        params: {
            q,
            page,
            pagesize,
        },
    });
    return res;
};
export const post = async (params = {}) => {
    const res = await httpRequest.post('teacher', {
        ...params,
    });
    return res;
};
export const put = async (id, params = {}) => {
    const res = await httpRequest.put(`teacher/${id}`, {
        ...params,
    });
    return res;
};
