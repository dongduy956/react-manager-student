import * as httpRequestPrivate from '~/utils/httpRequestPrivate';
export const get = async (page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('student', {
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
export const getSelect = async () => {
    try {
        const res = await httpRequestPrivate.get(`student/select`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const getByID = async (id) => {
    try {
        const res = await httpRequestPrivate.get(`student/${id}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const search = async (q, page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('student/search', {
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

export const del = async (id) => {
    try {
        const res = await httpRequestPrivate.del(`student/${id}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const post = async (params = {}) => {
    try {
        const res = await httpRequestPrivate.post('student', {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const put = async (id, params = {}) => {
    try {
        const res = await httpRequestPrivate.put(`student/${id}`, {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
