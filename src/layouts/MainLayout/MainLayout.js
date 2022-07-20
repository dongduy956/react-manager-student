import { FileAddTwoTone } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Footer, Header, Sider } from '~/layouts/components';
import './MainLayout.css';

const { Content } = Layout;
const { Search } = Input;

const MainLayout = ({ addRoute = '', children }) => {
    const [breakpoint, setBreakpoint] = useState(true);
    const handleChangeBreakpoint = (broken) => setBreakpoint(broken);
    const onSearch = (value) => console.log(value);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider onChangeBreakpoint={handleChangeBreakpoint} />
            <Layout className="site-layout">
                <Header />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div className="m-4 flex flex-wrap justify-between items-center">
                        {breakpoint && (
                            <Breadcrumb>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                        )}
                        {addRoute && (
                            <>
                                <Search
                                    className="md:ml-0 md:mr-0 mr-5 ml-5 md:basis-2/6 basis-full"
                                    placeholder="input search text"
                                    onSearch={onSearch}
                                    enterButton
                                />
                                <Link to={addRoute}>
                                    <Button
                                        className="flex justify-center items-center md:mt-0 mt-2 md:ml-0 ml-5 md:mr-0 mr-5"
                                        type="primary"
                                        icon={<FileAddTwoTone />}
                                    >
                                        Add
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};
PropTypes.propTypes = {
    children: PropTypes.node.isRequired,
};
export default MainLayout;
