import * as httpRequest from '~/utils/httpRequest';

export const getByID = async (id) => {
    const res = await httpRequest.get(`role/${id}`);
    return res;
};

export const getSelect = async () => {
    const res = await httpRequest.get(`role/select`);
    return res;
};
