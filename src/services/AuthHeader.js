import Cookies from 'js-cookie';
import { configCookies } from '~/config';

const authHeader = () => {
    const token = JSON.parse(Cookies.get(configCookies.cookies.login)).token;
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };
};
export default authHeader;
