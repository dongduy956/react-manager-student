import httpRequest from '~/utils/httpRequest';
export const login = async (params = {}) => {
    const res = await httpRequest.post('auth/login', {
        ...params,
    });
    return res;
};
