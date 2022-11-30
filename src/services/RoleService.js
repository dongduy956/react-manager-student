import * as httpRequestPrivate from '~/utils/httpRequestPrivate';

export const getByID = async (id) => {
    try {
        const res = await httpRequestPrivate.get(`role/${id}`);
        return res;
    } catch ({ response }) {
        return response;
    }
};

export const getSelect = async () => {
    try {
        const res = await httpRequestPrivate.get(`role/select`);
        return res;
    } catch ({ response }) {
        return response;
    }
};
