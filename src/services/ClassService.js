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
