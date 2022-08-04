import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/config/routes';

function validateLogin() {
    if (!Cookies.get('login')) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const history = useNavigate();
        history(routes.login);
    }
}

export default validateLogin;
