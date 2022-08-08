import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import validateLogin from '~/components/validateLogin';
import { configCookies, configStorage, configRoutes } from '~/config';
import { useDebounce } from '~/hooks';
import { searchSelector } from '~/redux';
import { SubjectService } from '~/services';

const Subject = () => {
    validateLogin();
    const history = useNavigate();
    const setStatusAuth = () => {
        sessionStorage.removeItem(configStorage.sessionStorages.sider);
        Cookies.remove(configCookies.cookies.login);
        history(configRoutes.routes.login);
    };
    const searchText = useSelector(searchSelector);
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
                compare: (a, b) => a.name - b.name,
            },
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
                            <Link state={record} to={configRoutes.routes.updateSubject} className="hover:text-cyan-500">
                                <EditOutlined />
                            </Link>
                        </Tooltip>
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
                res = await SubjectService.search(
                    params.searchText,
                    params.pagination.current,
                    params.pagination.pageSize,
                );
            else res = await SubjectService.get(params.pagination.current, params.pagination.pageSize);
            setLoading(false);
            if (res.status >= 400) {
                setStatusAuth();
                return;
            }
            setData(res.data.map((item) => ({ ...item, key: item.id })));
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
            const res = await SubjectService.del(id);
            setLoading(false);
            fetchData({
                pagination,
                delete: true,
                searchText: debounced,
            });
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

export default Subject;
