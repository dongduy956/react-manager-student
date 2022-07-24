import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from '~/routes';
import { ProviderStore, useStore } from './store';
import MainLayout from './layouts';
function App() {
    const reduce = useStore();
    console.log(reduce);
    let arrRoutes = [...routes.publicRoutes];
    // if (state) arrRoutes = [...arrRoutes, ...routes.privateRoutes];
    return (
        <Router>
            <Routes>
                {arrRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = MainLayout;
                    if (route.layout) Layout = route.layout;
                    else if (route.layout === null) Layout = Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ProviderStore addRoute={route.addRoute} title={route.title}>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </ProviderStore>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
