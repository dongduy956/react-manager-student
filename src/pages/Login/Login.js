import Cookies from 'js-cookie';

import { Button, Checkbox, Form, Input, notification, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '~/services';
const Login = () => {
    const history = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = (params) => {
        delete params.remember;
        fetchData(params);
    };
    useEffect(() => {
        if (Cookies.get('login')) {
            history('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = async (params) => {
        try {
            setLoading(true);
            const res = await AuthService.login(params);
            Cookies.set('login', JSON.stringify(res.data));
            setLoading(false);
            history('/');
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

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Spin spinning={loading} tip="Loading...">
            <div className="flex justify-center items-center h-screen">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
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
