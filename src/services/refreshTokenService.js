import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { AuthService } from '.';

async function refreshTokenService() {
    let login = Cookies.get('login');
    if (login) {
        login = JSON.parse(login);
        if (jwtDecode(login.token).exp < Date.now() / 1000) {
            const res = await AuthService.refreshToken({
                expiredToken: login.token,
                refreshToken: login.refreshToken,
            });
            Cookies.set('login', JSON.stringify(res.data));
        }
    }
}

export default refreshTokenService;
