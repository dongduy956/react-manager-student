import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm, Table, Tooltip, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { searchSelector } from '~/redux';
import { SubjectService } from '~/services';
import { useDebounce } from '~/hooks';
import { configRoutes } from '~/config';

const Subject = () => {
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
            try {
                let res;
                if (params.searchText)
                    res = await SubjectService.search(
                        params.searchText,
                        params.pagination.current,
                        params.pagination.pageSize,
                    );
                else res = await SubjectService.get(params.pagination.current, params.pagination.pageSize);
                setLoading(false);
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
                await SubjectService.del(id);
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

export default Subject;
