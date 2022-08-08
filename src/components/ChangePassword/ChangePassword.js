import { Button, Drawer, Form, Input, notification, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import md5 from 'md5';

import { authActiveSelector } from '~/redux';
import { TeacherService } from '~/services';

const ChangePassword = ({ show, onCloseModal }) => {
    const authActive = useSelector(authActiveSelector);
    const [visible, setVisible] = useState(show);
    useEffect(() => {
        setVisible(show);
    }, [show]);
    const onClose = () => {
        setVisible(false);
        onCloseModal();
    };
    const onFinish = (params) => {
        params.password = md5(params.password);
        params.newPassword = md5(params.newPassword);
        params.prePassword = md5(params.prePassword);
        (async () => {
            const res = await TeacherService.changePassword(authActive.id, params);
            if (res.status >= 400) {
                notification.error({
                    message: 'Error',
                    description: res.data.error,
                    duration: 3,
                });
            } else {
                notification.success({
                    message: 'Success',
                    description: 'Change password success.',
                    duration: 3,
                });
                onClose();
            }
        })();
    };
    return (
        <>
            <Drawer
                placement="top"
                title="Change password"
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                <Form
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 19,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
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
                        label="New password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Pre-password"
                        name="prePassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your pre-password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            sm: { offset: 5, span: 19 },
                        }}
                    >
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default ChangePassword;
