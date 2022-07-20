import PropTypes from 'prop-types';
import { DownOutlined, UserOutlined,KeyOutlined,LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space } from 'antd';
import { Link } from 'react-router-dom';

function HeaderCB({ children }) {
    const { Header } = Layout;
    const menu = (
        <Menu
            items={[
                {
                    label: <Link to='/'>Account information</Link>,
                    key: '1',
                    icon: <UserOutlined />
                },
                {
                    label: <Link to='/'>Change password</Link>,
                    key: '2',
                    icon:<KeyOutlined />
                },
                {
                    label: <Link to='/'>Logout</Link>,
                    key: '3',
                    icon: <LogoutOutlined />
                },
            ]}
        />
    );
    return (
        <Header
            className="site-layout-background flex justify-end "
            style={{
                padding: 16,
            }}
        >
            <Dropdown className="text-white" overlay={menu}>
                <button onClick={(e) => e.preventDefault()}>
                    <Space>
                        <span> Dương Đông Duy</span>
                        <DownOutlined />
                    </Space>
                </button>
            </Dropdown>
        </Header>
    );
}
PropTypes.propTypes = {
    children: PropTypes.node,
};
export default HeaderCB;
