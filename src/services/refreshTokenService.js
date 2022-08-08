import Cookies from 'js-cookie';
import { isExpired } from 'react-jwt';
import { configCookies } from '~/config';
import { AuthService } from '.';

async function refreshTokenService() {
    let login = Cookies.get(configCookies.cookies.login);
    if (login) {
        login = JSON.parse(login);
        if (isExpired(login.token)) {
            const res = await AuthService.refreshToken({
                expiredToken: login.token,
                refreshToken: login.refreshToken,
            });
            Cookies.set(configCookies.cookies.login, JSON.stringify(res.data), { expires: res.data.day });
        }
    }
}

export default refreshTokenService;
