import * as httpRequest from '~/utils/httpRequest';
export const get = async (page, pagesize) => {
    const res = await httpRequest.get('point', {
        params: {
            page,
            pagesize,
        },
    });
    return res;
};
export const del = async (idStudent, idSubject, numberOfTimes) => {
    const res = await httpRequest.del(`point/${idStudent}&${idSubject}&${numberOfTimes}`);
    return res;
};
export const search = async (q, page, pagesize) => {
    const res = await httpRequest.get('point/search', {
        params: {
            q,
            page,
            pagesize,
        },
    });
    return res;
};
export const post = async (params = {}) => {
    const res = await httpRequest.post('point', {
        ...params,
    });
    return res;
};
export const put = async (idStudent, idSubject, numberOfTimes, params = {}) => {
    const res = await httpRequest.put(`point/${idStudent}&${idSubject}&${numberOfTimes}`, {
        ...params,
    });
    return res;
};
