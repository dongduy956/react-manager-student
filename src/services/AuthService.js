import httpRequestPublic from '~/utils/httpRequestPublic';
import httpRequestPrivate from '~/utils/httpRequestPrivate';

export const login = async (params = {}) => {
    const res = await httpRequestPublic.post('Auth/token', {
        ...params,
    });
    return res;
};
export const refreshToken = async (params = {}) => {
    const res = await httpRequestPublic.post('Auth/RefreshToken', {
        ...params,
    });
    return res;
};
export const logout = async (params = {}) => {
    const res = await httpRequestPrivate.post('Auth/logout', {
        ...params,
    });
    return res;
};
