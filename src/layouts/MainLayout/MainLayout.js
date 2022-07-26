import { FileAddTwoTone, ArrowUpOutlined } from '@ant-design/icons';
import { BackTop, Breadcrumb, Button, Layout } from 'antd';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Footer, Header, Sider } from '~/layouts/components';
import Search from '~/components/Search';
import './MainLayout.css';
import styles from './MainLayout.module.scss';

const cx = className.bind(styles);

const { Content } = Layout;

const MainLayout = ({ addRoute = '', title = '', children }) => {
    const [breakpoint, setBreakpoint] = useState(true);
    const handleChangeBreakpoint = (broken) => setBreakpoint(broken);
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
                                <Search />
                                <Link to={addRoute}>
                                    <Button
                                        className={
                                            'flex justify-center items-center md:mt-0 mt-2 md:ml-0 ml-5 md:mr-0 mr-5 ' +
                                            cx('button-add')
                                        }
                                        type="primary"
                                        icon={<FileAddTwoTone />}
                                    >
                                        Add
                                    </Button>
                                </Link>
                            </>
                        )}
                        {title && (
                            <h3 className="flex-1 text-center text-cyan-700 text-4xl uppercase leading-10">{title}</h3>
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
            <BackTop>
                <div className="text-blue-900">
                    <ArrowUpOutlined />
                </div>
            </BackTop>
        </Layout>
    );
};
PropTypes.propTypes = {
    children: PropTypes.node.isRequired,
    addRoute: PropTypes.string,
    title: PropTypes.string,
};
export default MainLayout;
