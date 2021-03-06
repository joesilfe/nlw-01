import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home/home';
import CreatePoint from './pages/CreatePoint/createPoint';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
        </ BrowserRouter >
    )
}

export default Routes;