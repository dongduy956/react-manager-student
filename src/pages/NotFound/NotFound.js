import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { configRoutes } from '~/config';

const NotFound = () => {
    const history = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button onClick={() => history(configRoutes.routes.point)} type="primary">
                    Back Home
                </Button>
            }
        />
    );
};

export default NotFound;
