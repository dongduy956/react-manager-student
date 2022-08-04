import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function validateLogin() {
    if (!Cookies.get('login')) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const history = useNavigate();
        history('/login');
    }
}

export default validateLogin;
