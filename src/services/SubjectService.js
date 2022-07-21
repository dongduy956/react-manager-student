import * as httpRequest from '~/utils/httpRequest';
export const get = async (page, pagesize) => {
    const res = await httpRequest.get('subject', {
        params: {
            page,
            pagesize,
        },
    });
    return res;
};
export const del = async (id) => {
    const res = await httpRequest.del(`subject/${id}`);
    return res;
};
export const search = async (q, page, pagesize) => {
    const res = await httpRequest.get('subject/search', {
        params: {
            q,
            page,
            pagesize,
        },
    });
    return res;
};
