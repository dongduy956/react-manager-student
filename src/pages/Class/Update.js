import React, { useState } from 'react';
import { ArrowLeftOutlined, FileAddTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';
import className from 'classnames/bind';

import { ClassService } from '~/services';
import { configRoutes } from '~/config';
import styles from './Class.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import validateLogin from '~/components/validateLogin';

const cx = className.bind(styles);

const formItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const Update = () => {
    validateLogin();
    const { state } = useLocation();
    const history = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const fetchData = async (params) => {
        try {
            setLoading(true);
            const res = await ClassService.put(state.id, params);
            if (!res.error) history(configRoutes.routes.class);
            else
                notification.error({
                    message: 'Error',
                    description: res.error,
                    duration: 3,
                });

            setLoading(false);
            notification.success({
                message: 'Success',
                description: 'Update success',
                duration: 3,
            });
        } catch ({ response }) {
            notification.error({
                message: 'Error',
                description: response.data.error,
                duration: 3,
            });

            setLoading(false);
        }
    };
    const onFinish = (params) => fetchData(params);

    return (
        <Spin spinning={loading} tip="Loading...">
            <Form {...formItemLayout} form={form} name="add-class" onFinish={onFinish} scrollToFirstError>
                <Form.Item
                    initialValue={state.name}
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Link to={configRoutes.routes.class}>
                        <Button className={`mr-4 ${cx('btn')}`} icon={<ArrowLeftOutlined />} danger>
                            Back
                        </Button>
                    </Link>
                    <Button
                        className={`mt-2 sm:mt-0 ${cx('btn')}`}
                        icon={<FileAddTwoTone />}
                        type="primary"
                        htmlType="submit"
                    >
                        Update class
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Update;
