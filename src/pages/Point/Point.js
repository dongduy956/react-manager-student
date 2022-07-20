import { Table } from 'antd';
import { useEffect, useState } from 'react';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: (name) => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        // filters: [
        //     {
        //         text: 'Male',
        //         value: 'male',
        //     },
        //     {
        //         text: 'Female',
        //         value: 'female',
        //     },
        // ],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];



const Point = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 1,
    });

    const fetchData = (params = {}) => {
        setLoading(true);
        fetch(`https://randomuser.me/api?`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setPagination({
                    ...params.pagination,
                    total: 200, // 200 is mock data, you should read it from server
                    // total: data.totalCount,
                });
            });
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
            // rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{
                x:true,y:true
            }}          
        />
    );
};

export default Point;
