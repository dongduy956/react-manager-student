import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm, Table, Tooltip, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useStore } from '~/store';
import { RoleService, TeacherService } from '~/services';
import { useDebounce } from '~/hooks';
import { configRoutes } from '~/config';

const Student = () => {
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
                            <Tooltip placement="bottom" title={'Delete ' + record.name} color="red">
                                <button className="hover:text-rose-800">
                                    <DeleteOutlined />
                                </button>
                            </Tooltip>
                        </Popconfirm>
                        <Tooltip className="ml-5" placement="bottom" title={'Update ' + record.name} color="cyan">
                            <Link
                                state={record}
                                to={configRoutes.contains.updateTeacher + record.alias}
                                className="hover:text-cyan-500"
                            >
                                <EditOutlined />
                            </Link>
                        </Tooltip>
                    </>
                ) : null,
        },
    ];
    const { reduce } = useStore();
    const [state] = reduce;
    const debounced = useDebounce(state.searchText, 500);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const fetchData = (params = {}) => {
        setLoading(true);
        (async () => {
            try {
                let res;
                if (params.searchText)
                    res = await TeacherService.search(
                        params.searchText,
                        params.pagination.current,
                        params.pagination.pageSize,
                    );
                else res = await TeacherService.get(params.pagination.current, params.pagination.pageSize);
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
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    };
    const handleDelete = (id) => {
        (async () => {
            try {
                setLoading(true);
                await TeacherService.del(id);
                setLoading(false);
                fetchData({
                    pagination,
                    delete: true,
                    searchText: debounced,
                });
            } catch ({ response }) {
                setLoading(false);
                notification.error({
                    message: 'Error',
                    description: response.data.error,
                    duration: 3,
                });
            }
        })();
    };
    useEffect(() => {
        fetchData({
            pagination,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        fetchData({
            pagination,
            searchText: debounced,
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
