import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { configRoutes } from '~/config';
import { setSearchText, useStore } from '~/store';

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
    const { reduce } = useStore();
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedWidth, setCollapsedWidth] = useState(80);
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const [broken, setBroken] = useState(false);

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
                onClick={() => setSelectedKeys(['1'])}
            >
                <img
                    className="w-16 h-16 rounded-full my-4"
                    src="https://nonbaohiem.ml/assets/images/banner/banner1.jpg"
                    alt="Logo"
                />
            </Link>
            <Menu
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
                selectedKeys={selectedKeys}
                onSelect={(item) => {
                    setSelectedKeys([item.key]);
                    if (broken) setCollapsed(true);
                    reduce[1](setSearchText(''));
                }}
            />
        </Sider>
    );
}

export default SiderCB;
