import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ArrowLeftOutlined, FileAddTwoTone, InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification, Select, DatePicker, message, Upload } from 'antd';
import className from 'classnames/bind';

import { RoleService, UploadService, TeacherService } from '~/services';
import { configRoutes } from '~/config';
import styles from './Teacher.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import validateLogin from '~/components/validateLogin';

const cx = className.bind(styles);
const { Option } = Select;
const { Dragger } = Upload;
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
    validateLogin();
    const props = {
        name: 'file',
        multiple: false,
        customRequest: async (options) => {
            const { onSuccess, onError, file, onProgress } = options;

            const formData = new FormData();
            formData.append('file', file);
            const config = {
                headers: { 'content-type': 'multipart/form-data' },
                onUploadProgress: (event) => {
                    onProgress({ percent: (event.loaded / event.total) * 100 });
                },
            };
            UploadService.image(formData, config)
                .then((res) => {
                    setImageTeacher(res.filename);
                    onSuccess('Ok');
                })
                .catch((err) => {
                    console.log(err);
                    onError({ err });
                });
        },
        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const history = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataRole, setDataRole] = useState([]);
    const [dateOfBirth, setDateOfBirth] = useState(moment());
    const [imageTeacher, setImageTeacher] = useState('');
    useEffect(() => {
        (async () => {
            const resRole = await RoleService.getSelect();
            setDataRole(resRole.data);
        })();
    }, []);
    const onChangeDatePicker = (date, dateString) => {
        setDateOfBirth(date);
    };

    const fetchData = async (params) => {
        try {
            setLoading(true);
            const res = await TeacherService.post(params);
            if (!res.error) history(configRoutes.routes.teacher);
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
    const onFinish = (params) => {
        params.image = imageTeacher;
        params.dateOfBirth = dateOfBirth.format();

        fetchData(params);
    };

    return (
        <Spin spinning={loading} tip="Loading...">
            <Form {...layout} {...formItemLayout} form={form} name="add-class" onFinish={onFinish} scrollToFirstError>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
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
                <Form.Item
                    initialValue={moment(new Date(), 'dd/MM/yyyy')}
                    name="dateOfBirth"
                    label="Date Of Birth"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a option Date Of Birth',
                        },
                    ]}
                >
                    <DatePicker className="w-full" onChange={onChangeDatePicker} />
                </Form.Item>

                <Form.Item
                    name="idRole"
                    label="Role"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a option role',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={this.onGenderChange}
                        allowClear
                    >
                        {dataRole.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="image" label="Image">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Link to={configRoutes.routes.teacher}>
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
                        Add teacher
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Add;
