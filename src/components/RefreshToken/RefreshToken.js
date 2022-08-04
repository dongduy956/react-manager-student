import { AuthService } from '~/services';

const RefreshToken = async (login) => {
    console.log(login);
    return await AuthService.refreshToken({
        expiredToken: login.token,
        refreshToken: login.refreshToken,
    });
};

export default RefreshToken;
