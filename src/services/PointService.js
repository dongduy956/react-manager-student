import * as httpRequestPrivate from '~/utils/httpRequestPrivate';
export const get = async (page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('point', {
            params: {
                page,
                pagesize,
            },
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const del = async (idStudent, idSubject, numberOfTimes) => {
    try {
        const res = await httpRequestPrivate.del(`point/${idStudent}&${idSubject}&${numberOfTimes}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const search = async (q, page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('point/search', {
            params: {
                q,
                page,
                pagesize,
            },
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const post = async (params = {}) => {
    try {
        const res = await httpRequestPrivate.post('point', {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const put = async (idStudent, idSubject, numberOfTimes, params = {}) => {
    try {
        const res = await httpRequestPrivate.put(`point/${idStudent}&${idSubject}&${numberOfTimes}`, {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
