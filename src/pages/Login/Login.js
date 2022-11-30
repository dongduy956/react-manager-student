import { Button, Form, Input, notification, Spin } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { configCookies, configRoutes } from '~/config';
import { authSlice } from '~/redux/slices';
import { AuthService, TeacherService } from '~/services';
const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = (params) => {
        fetchData(params);
    };
    useEffect(() => {
        if (Cookies.get(configCookies.cookies.login)) {
            history(configRoutes.routes.point);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = async (params) => {
        try {
            setLoading(true);
            const res = await AuthService.login(params);
            Cookies.set(configCookies.cookies.login, JSON.stringify(res.data), { expires: res.data.day });
            const auth = await TeacherService.getByID(decodeToken(res.data.token).nameid);
            console.log('[LoginPage]', auth);
            dispatch(authSlice.actions.setAuthActive(auth));
            setLoading(false);
            history(configRoutes.routes.point);
        } catch (error) {
            setLoading(false);
            console.log(error);
            notification.error({
                message: 'Error',
                description: 'Username or password incorrect.',
                duration: 3,
            });
        }
    };

    return (
        <Spin spinning={loading} tip="Loading...">
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="text-red-900 font-bold text-center">Đăng nhập hệ thống</h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default Login;
