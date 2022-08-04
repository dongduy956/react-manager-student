import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from '~/routes';
import MainLayout from './layouts';

function App() {
    return (
        <Router>
            <Routes>
                {routes.publicRoutes.map((route, index) => {
                    let isLayout = true;
                    const Page = route.component;
                    let Layout = MainLayout;
                    if (route.layout) Layout = route.layout;
                    else if (route.layout === null) {
                        Layout = Fragment;
                        isLayout = false;
                    }
                    const props = {};
                    if (isLayout) {
                        props.addRoute = route.addRoute;
                        props.title = route.title;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout {...props}>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
