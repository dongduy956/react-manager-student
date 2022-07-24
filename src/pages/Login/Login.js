import jwt from 'jwt-decode';
import Cookie from 'js-cookie';

import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { AuthService } from '~/services';
import { useNavigate } from 'react-router-dom';
import { setStatusLogin, useStore } from '~/store';
const Login = () => {
    const [reduce] = useStore();
    const [state, dispatch] = reduce;
    const history = useNavigate();
    const onFinish = (params) => {
        delete params.remember;
        fetchData(params);
    };
    const fetchData = async (params) => {
        try {
            const res = await AuthService.login(params);
            localStorage.setItem('login', res.data.accessToken);
            dispatch(setStatusLogin(true));
            history('/');
        } catch (error) {}
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
    );
};

export default Login;
