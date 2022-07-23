import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, FileAddTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification, Select } from 'antd';
import className from 'classnames/bind';

import { SubjectService, PointService, StudentService } from '~/services';
import { configRoutes } from '~/config';
import styles from './Point.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const cx = className.bind(styles);
const { Option } = Select;
const layout = {
    labelCol: {
        span: 6,
    },
};
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
        span: 24,
    },
};

const Add = () => {
    const history = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataStudent, setDataStudent] = useState([]);
    const [dataSubject, setDataSubject] = useState([]);
    useEffect(() => {
        (async () => {
            const resStudent = await StudentService.getSelect();
            setDataStudent(resStudent.data);
            const resSubject = await SubjectService.getSelect();
            setDataSubject(resSubject.data);
        })();
    }, []);

    const fetchData = async (params) => {
        try {
            setLoading(true);
            const res = await PointService.post(params);
            if (!res.error) history(configRoutes.routes.point);
            else
                notification.error({
                    message: 'Error',
                    description: res.error,
                    duration: 3,
                });

            setLoading(false);
            notification.success({
                message: 'Success',
                description: 'Add success',
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
            <Form {...layout} {...formItemLayout} form={form} name="add-class" onFinish={onFinish} scrollToFirstError>
                <Form.Item
                    className="text-left"
                    name="idStudent"
                    label="Student"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a option student',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={this.onGenderChange}
                        allowClear
                    >
                        {dataStudent.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="idSubject"
                    label="Subject"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a option subject',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={this.onGenderChange}
                        allowClear
                    >
                        {dataSubject.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="numberOfTimes"
                    label="Number Of Times"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Number Of Times!',
                        },
                    ]}
                >
                    <Input type="number" min="1" />
                </Form.Item>
                <Form.Item
                    name="points"
                    label="Points"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Points!',
                        },
                    ]}
                >
                    <Input type="number" min="0" max="10" />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Link to={configRoutes.routes.point}>
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
                        Add point
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Add;
