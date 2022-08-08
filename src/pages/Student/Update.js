import React, { useState, useEffect } from 'react';
import { ArrowLeftOutlined, FileAddTwoTone, InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification, Select, DatePicker, message, Upload } from 'antd';
import className from 'classnames/bind';
import moment from 'moment';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { configRoutes } from '~/config';
import styles from './Student.module.scss';
import { ClassService, UploadService, StudentService } from '~/services';
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
                    setImageStudent(res.filename);
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
    const [dateOfBirth, setDateOfBirth] = useState(state.dateOfBirth);
    const [imageStudent, setImageStudent] = useState(state.image);
    const [dataClass, setDataClass] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await ClassService.getSelect();
            setDataClass(res.data);
        })();
    }, []);

    const onChangeDatePicker = (date, dateString) => {
        setDateOfBirth(date);
    };
    const fetchData = async (params) => {
        try {
            setLoading(true);
            const res = await StudentService.put(state.id, params);
            if (!res.error) history(configRoutes.routes.student);
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
    const onFinish = (params) => {
        params.image = imageStudent;
        try {
            params.dateOfBirth = dateOfBirth.format();
        } catch (error) {
            params.dateOfBirth = dateOfBirth;
        }
        fetchData(params);
    };

    return (
        <Spin spinning={loading} tip="Loading...">
            <Form {...layout} {...formItemLayout} form={form} name="add-class" onFinish={onFinish} scrollToFirstError>
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
                <Form.Item
                    initialValue={moment(new Date(state.dateOfBirth), 'dd/MM/yyyy')}
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
                    initialValue={state.idClass}
                    name="idClass"
                    label="Class"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a option class',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={this.onGenderChange}
                        allowClear
                    >
                        {dataClass.map((item) => (
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
                    <Link to={configRoutes.routes.student}>
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
                        Update student
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Update;
