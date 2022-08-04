import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popconfirm, Table, Tooltip, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import { searchSelector } from '~/redux';
import { PointService, StudentService, SubjectService } from '~/services';
import { useDebounce } from '~/hooks';
import { configCookies, configRoutes } from '~/config';
import validateLogin from '~/components/validateLogin';

const Point = () => {
    validateLogin();
    const history = useNavigate();
    const setStatusAuth = () => {
        Cookies.remove(configCookies.cookies.login);
        history(configRoutes.routes.login);
    };
    const searchText = useSelector(searchSelector);
    const columns = [
        {
            title: 'Student',
            dataIndex: 'student',
            sorter: {
                compare: (a, b) => a.student.localeCompare(b.student),
            },
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            sorter: {
                compare: (a, b) => a.subject.localeCompare(b.subject),
            },
        },
        {
            title: 'Number Of Times',
            dataIndex: 'numberOfTimes',
            sorter: {
                compare: (a, b) => a.id - b.id,
            },
        },
        {
            title: 'Points',
            dataIndex: 'points',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
                data.length >= 1 ? (
                    <>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.idStudent, record.idSubject, record.numberOfTimes)}
                        >
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
                                to={configRoutes.contains.updatePoint + record.alias}
                                className="hover:text-cyan-500"
                            >
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
                res = await PointService.search(
                    params.searchText,
                    params.pagination.current,
                    params.pagination.pageSize,
                );
            else res = await PointService.get(params.pagination.current, params.pagination.pageSize);
            if (res.status >= 400) {
                setLoading(false);
                setStatusAuth();
                return;
            }
            const newData = await (async () => {
                const data = [];
                for (var item of res.data) {
                    const resStudent = await StudentService.getByID(item.idStudent);
                    const resSubject = await SubjectService.getByID(item.idSubject);
                    data.push({
                        ...item,
                        key: `${item.idStudent}-${item.idSubject}-${item.numberOfTimes}`,
                        student: resStudent.name,
                        subject: resSubject.name,
                    });
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
    const handleDelete = (idStudent, idSubject, numberOfTimes) => {
        (async () => {
            setLoading(true);
            const res = await PointService.del(idStudent, idSubject, numberOfTimes);
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

export default Point;
