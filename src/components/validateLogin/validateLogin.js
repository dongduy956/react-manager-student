import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { configCookies, configStorage } from '~/config';
import { routes } from '~/config/routes';

function validateLogin() {
    if (!Cookies.get(configCookies.cookies.login)) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const history = useNavigate();
        sessionStorage.removeItem(configStorage.sessionStorages.sider);
        history(routes.login);
    }
}

export default validateLogin;
