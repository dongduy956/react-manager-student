import httpRequest from '~/utils/httpRequest';
export const login = async (params = {}) => {
    const res = await httpRequest.post('Auth/token', {
        ...params,
    });
    return res;
};
export const refreshToken = async (params = {}) => {
    const res = await httpRequest.post('Auth/RefreshToken', {
        ...params,
    });
    return res;
};
export const logout = async (params = {}) => {
    const res = await httpRequest.post('Auth/logout', {
        ...params,
    });
    return res;
};
