import Cookies from 'js-cookie';
import { configCookies } from '~/config';
import { AuthService } from '.';

async function refreshTokenService() {
    let login = Cookies.get(configCookies.cookies.login);
    if (login) {
        login = JSON.parse(login);
        const res = await AuthService.refreshToken({
            expiredToken: login.token,
            refreshToken: login.refreshToken,
        });
        Cookies.set(configCookies.cookies.login, JSON.stringify(res.data), { expires: res.data.day });
        console.log('[RefreshTokenService]', res);
        return res;
    }
}

export default refreshTokenService;
