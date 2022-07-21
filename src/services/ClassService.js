import * as httpRequest from '~/utils/httpRequest';
export const get = async (page, pagesize) => {
    const res = await httpRequest.get('classes', {
        params: {
            page,
            pagesize,
        },
    });
    return res;
};
export const del = async (id) => {
    const res = await httpRequest.del(`classes/${id}`);
    return res;
};
export const search = async (q, page, pagesize) => {
    const res = await httpRequest.get('classes/search', {
        params: {
            q,
            page,
            pagesize,
        },
    });
    return res;
};
export const post = async (params = {}) => {
    const res = await httpRequest.post('classes', {
        ...params
    });
    return res;
};
export const put = async (id,params = {}) => {
    const res = await httpRequest.put(`classes/${id}`, {
        ...params
    });
    return res;
};