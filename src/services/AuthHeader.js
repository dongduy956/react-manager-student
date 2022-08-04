import Cookies from 'js-cookie';

const authHeader = () => {
    const token = JSON.parse(Cookies.get('login')).token;
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };
};
export default authHeader;
