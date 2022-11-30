import * as httpRequestPrivate from '~/utils/httpRequestPrivate';
export const get = async (page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('teacher', {
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
export const getByID = async (id) => {
    try {
        const res = await httpRequestPrivate.get(`teacher/${id}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const del = async (id) => {
    try {
        const res = await httpRequestPrivate.del(`teacher/${id}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const search = async (q, page, pagesize) => {
    try {
        const res = await httpRequestPrivate.get('teacher/search', {
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
        const res = await httpRequestPrivate.post('teacher', {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const put = async (id, params = {}) => {
    try {
        const res = await httpRequestPrivate.put(`teacher/${id}`, {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};
export const changePassword = async (id, params = {}) => {
    try {
        const res = await httpRequestPrivate.put(`teacher/ChangePass/${id}`, {
            ...params,
        });
        return res;
    } catch ({ response }) {
        return response;
    }
};

export const resetPassword = async (id, params = {}) => {
    try {
        const res = await httpRequestPrivate.put(`teacher/ResetPassword/${id}`, {});
        return res;
    } catch ({ response }) {
        return response;
    }
};
