import { DownOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Skeleton, Space } from 'antd';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ChangePassword from '~/components/ChangePassword/ChangePassword';
import validateLogin from '~/components/validateLogin';
import { configCookies, configStorage, configRoutes } from '~/config';
import { authActiveSelector } from '~/redux';
import { authSlice } from '~/redux/slices';

import { AuthService, TeacherService } from '~/services';

function HeaderCB({ children }) {
    const auth = useSelector(authActiveSelector);
    const { pathname } = useLocation();
    const { Header } = Layout;
    const [show, setShow] = useState(false);
    const handleLogout = () => {
        (async () => {
            try {
                let login = Cookies.get(configCookies.cookies.login);
                if (login) {
                    login = JSON.parse(login);
                    await AuthService.logout({
                        expiredToken: login.token,
                        refreshToken: login.refreshToken,
                    });
                    Cookies.remove(configCookies.cookies.login);
                    sessionStorage.removeItem(configStorage.sessionStorages.sider);
                    history(configRoutes.routes.login);
                }
            } catch (error) {}
        })();
    };
    const handleAccountInfo = () => {
        dispatch(authSlice.actions.setPathUpdate(pathname));
    };
    const handleChangePassword = () => {
        setShow(true);
    };
    const onClose = () => {
        setShow(false);
    };
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <Link onClick={handleAccountInfo} to={configRoutes.contains.updateTeacher + auth.username}>
                            Account information
                        </Link>
                    ),
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    label: <a onClick={handleChangePassword}>Change password</a>,
                    key: '2',
                    icon: <KeyOutlined />,
                },
                {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    label: <a onClick={handleLogout}>Logout</a>,
                    key: '3',
                    icon: <LogoutOutlined />,
                },
            ]}
        />
    );

    const dispatch = useDispatch();
    const history = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!Object.keys(auth).length) {
            if (!Cookies.get(configCookies.cookies.login)) return;
            const token = JSON.parse(Cookies.get(configCookies.cookies.login)).token;
            const authActive = decodeToken(token);
            setLoading((prev) => !prev);
            TeacherService.getByID(authActive.nameid)
                .then((res) => {
                    dispatch(authSlice.actions.setAuthActive(res));
                    setLoading((prev) => !prev);
                })
                .catch((err) => {
                    setLoading((prev) => !prev);
                    validateLogin();
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Header
            className="site-layout-background flex justify-end "
            style={{
                padding: 16,
            }}
        >
            <Skeleton
                style={{
                    maxWidth: '200px',
                }}
                paragraph={{
                    rows: 1,
                    style: {
                        margin: 0,
                    },
                }}
                loading={loading}
                active
            >
                <Dropdown overlay={menu}>
                    <button className="text-white" onClick={(e) => e.preventDefault()}>
                        <Space>
                            <img
                                alt=""
                                className="w-10 h-10 rounded-full border border-solid border-zinc-200"
                                src={process.env.REACT_APP_BASE_URL + auth.image}
                            />
                            <span>{auth.name}</span>
                            <DownOutlined />
                        </Space>
                    </button>
                </Dropdown>
            </Skeleton>
            <ChangePassword show={show} onCloseModal={onClose} />
        </Header>
    );
}
PropTypes.propTypes = {
    children: PropTypes.node,
};
export default HeaderCB;
