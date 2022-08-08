import { DeleteOutlined, EditOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table, Tooltip } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import validateLogin from '~/components/validateLogin';
import { configCookies, configStorage, configRoutes } from '~/config';
import { useDebounce } from '~/hooks';
import { searchSelector } from '~/redux';
import { RoleService, TeacherService } from '~/services';

const Student = () => {
    validateLogin();
    const [loadingChangePass, setLoadingChangePass] = useState(0);

    const history = useNavigate();
    const setStatusAuth = () => {
        sessionStorage.removeItem(configStorage.sessionStorages.sider);
        Cookies.remove(configCookies.cookies.login);
        history(configRoutes.routes.login);
    };
    const searchText = useSelector(searchSelector);
    const handleResetPass = (id) => {
        (async () => {
            setLoadingChangePass(id);
            const res = await TeacherService.resetPassword(id);
            setLoadingChangePass(0);
            if (res.status >= 400) {
                notification.error({
                    message: 'Error',
                    description: res.data.error,
                    duration: 3,
                });
            } else {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    duration: 3,
                });
            }
        })();
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
            },
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dateOfBirth',
            sorter: {
                compare: (b, a) =>
                    new Date(a.dateOfBirth)
                        .toLocaleDateString()
                        .localeCompare(new Date(b.dateOfBirth).toLocaleDateString()),
            },
            render: (_, record) => {
                const date = new Date(record.dateOfBirth);
                return date.toLocaleDateString();
            },
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (_, record) => {
                return (
                    <img
                        className="rounded-full w-full h-12 text-center object-cover"
                        alt={record.name}
                        src={process.env.REACT_APP_BASE_URL + record.image}
                    />
                );
            },
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
                data.length >= 1 ? (
                    <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Tooltip placement="bottom" title="Delete" color="red">
                                <button className="hover:text-rose-800">
                                    <DeleteOutlined />
                                </button>
                            </Tooltip>
                        </Popconfirm>
                        <Tooltip className="ml-5" placement="bottom" title="Update" color="cyan">
                            <Link
                                state={record}
                                to={configRoutes.contains.updateTeacher + record.alias}
                                className="hover:text-cyan-500"
                            >
                                <EditOutlined />
                            </Link>
                        </Tooltip>
                        {loadingChangePass === record.id ? (
                            <LoadingOutlined
                                style={{
                                    fontSize: 24,
                                    color: 'gold',
                                }}
                                spin
                            />
                        ) : (
                            <Tooltip className="ml-5" placement="bottom" title="Reset password" color="gold">
                                <button onClick={() => handleResetPass(record.id)} className="hover:text-yellow-600">
                                    <SyncOutlined />
                                </button>
                            </Tooltip>
                        )}
                    </>
                ) : null,
        },
    ];
    const debounced = useDebounce(searchText, 500);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const fetchData = (params = {}) => {
        setLoading(true);
        (async () => {
            let res;
            if (params.searchText)
                res = await TeacherService.search(
                    params.searchText,
                    params.pagination.current,
                    params.pagination.pageSize,
                );
            else res = await TeacherService.get(params.pagination.current, params.pagination.pageSize);
            if (res.status >= 400) {
                setLoading(false);
                setStatusAuth();
                return;
            }
            const newData = await (async () => {
                const data = [];
                for (var item of res.data) {
                    const resRole = await RoleService.getByID(item.idRole);
                    data.push({ ...item, key: item.id, role: resRole.name });
                }
                return data;
            })();
            setLoading(false);
            setData(newData);
            setPagination({
                ...params.pagination,
                total: res.totalItems,
            });
            if (params.delete)
                notification.success({
                    message: 'Success',
                    description: 'Delete success.',
                    duration: 3,
                });
        })();
    };
    const handleDelete = (id) => {
        (async () => {
            setLoading(true);
            const res = await TeacherService.del(id);
            setLoading(false);
            if (res.status === 401) {
                setStatusAuth();
                return;
            }
            if (res.status >= 400) {
                notification.error({
                    message: 'Error',
                    description: res.data.error,
                    duration: 3,
                });
                return;
            }
            fetchData({
                pagination,
                delete: true,
                searchText: debounced,
            });
        })();
    };
    useEffect(() => {
        if (debounced)
            fetchData({
                pagination,
                searchText: debounced,
            });
        else
            fetchData({
                pagination,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
    const handleTableChange = (newPagination, filters, sorter) => {
        fetchData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{
                x: true,
            }}
        />
    );
};

export default Student;
