import { Popconfirm, Table, Tooltip, notification } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

import * as ClassService from '~/services/ClassService';

const Class = () => {
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
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Tooltip placement="bottom" title={'Delete ' + record.name} color="red">
                            <button className="hover:text-rose-800">
                                <DeleteOutlined />
                            </button>
                        </Tooltip>
                    </Popconfirm>
                ) : null,
        },
    ];
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
                const res = await ClassService.get(params.pagination.current, params.pagination.pageSize);
                setLoading(false);
                setData(res.data.map((item, index) => ({ ...item, key: index })));
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
                await ClassService.del(id);
                setLoading(false);
                fetchData({
                    pagination,
                    delete: true,
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
                y: true,
            }}
        />
    );
};

export default Class;
