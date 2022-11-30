import httpRequestPrivate from '~/utils/httpRequestPrivate';

export const get = async (page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('classes', {
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
        const res = await httpRequestPrivate.get(`classes/select`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const getByID = async (id) => {
    try {
        const res = await httpRequestPrivate.get(`classes/${id}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const del = async (id) => {
    try {
        const res = await httpRequestPrivate.del(`classes/${id}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const search = async (q, page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('classes/search', {
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
        const res = await httpRequestPrivate.post('classes', {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const put = async (id, params = {}) => {
    try {
        const res = await httpRequestPrivate.put(`classes/${id}`, {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
