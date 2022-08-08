import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { configRoutes } from '~/config';
import { searchSlice } from '~/redux/slices';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<Link to={configRoutes.routes.point}>Point</Link>, '1', <PieChartOutlined />),
    getItem(<Link to={configRoutes.routes.class}>Class</Link>, '2', <DesktopOutlined />),
    getItem(<Link to={configRoutes.routes.student}>Student</Link>, '3', <UserOutlined />),
    getItem(<Link to={configRoutes.routes.subject}>Subject</Link>, '4', <TeamOutlined />),
    getItem(<Link to={configRoutes.routes.teacher}>Teacher</Link>, '5', <FileOutlined />),
];
function SiderCB({ onChangeBreakpoint }) {
    const siderActive = sessionStorage.getItem('sider');
    const selectKeys = siderActive ? JSON.parse(siderActive) : ['1'];
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedWidth, setCollapsedWidth] = useState(80);
    const [broken, setBroken] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(selectKeys);

    return (
        <Sider
            collapsible
            collapsedWidth={collapsedWidth}
            collapsed={collapsed}
            breakpoint="md"
            onBreakpoint={(broken) => {
                broken ? setCollapsedWidth(0) : setCollapsedWidth(80);
                onChangeBreakpoint(!broken);
                setBroken(broken);
            }}
            onCollapse={(value) => setCollapsed(value)}
            defaultCollapsed
        >
            <Link
                to={configRoutes.routes.point}
                className="logo flex justify-center"
                onClick={() => {
                    sessionStorage.setItem('sider', JSON.stringify(['1']));
                    setSelectedKeys(['1']);
                }}
            >
                <img
                    className="w-16 h-16 rounded-full my-4"
                    src="https://nonbaohiem.ml/assets/images/banner/banner1.jpg"
                    alt="Logo"
                />
            </Link>
            <Menu
                selectedKeys={selectedKeys}
                defaultSelectedKeys={selectedKeys}
                theme="dark"
                mode="inline"
                items={items}
                onSelect={(item) => {
                    sessionStorage.setItem('sider', JSON.stringify([item.key]));
                    setSelectedKeys([item.key]);
                    if (broken) setCollapsed(true);
                    dispatch(searchSlice.actions.setSearch(''));
                }}
            />
        </Sider>
    );
}

export default SiderCB;
