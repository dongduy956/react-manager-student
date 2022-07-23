import * as httpRequest from '~/utils/httpRequest';
export const get = async (page, pagesize) => {
    const res = await httpRequest.get('student', {
        params: {
            page,
            pagesize,
        },
    });
    return res;
};
export const getSelect = async () => {
    const res = await httpRequest.get(`student/select`);
    return res;
};
export const getByID = async (id) => {
    const res = await httpRequest.get(`student/${id}`);
    return res;
};
export const search = async (q, page, pagesize) => {
    const res = await httpRequest.get('student/search', {
        params: {
            q,
            page,
            pagesize,
        },
    });
    return res;
};

export const del = async (id) => {
    const res = await httpRequest.del(`student/${id}`);
    return res;
};
export const post = async (params = {}) => {
    const res = await httpRequest.post('student', {
        ...params,
    });
    return res;
};
export const put = async (id, params = {}) => {
    const res = await httpRequest.put(`student/${id}`, {
        ...params,
    });
    return res;
};
