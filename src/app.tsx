import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import Customers from './customers/CustomersList';
import PostersRoutes from './posters/PostersRoutes';
import Header from './Header';
import store from './store';

const AppContainer = styled.div`
    font-family: sans-serif;
    text-align: center;
`;

export const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer>
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/customers">
                                <>
                                    <Typography variant="h2" gutterBottom>
                                        Customers
                                    </Typography>
                                    <Customers />
                                </>
                            </Route>
                            <Route path="/posters">
                                <PostersRoutes />
                            </Route>
                            <Redirect exact path="/" to="/posters" />
                            <Route>
                                <h1>404</h1>
                            </Route>
                        </Switch>
                    </main>
                </AppContainer>
            </Provider>
        </BrowserRouter>
    );
};
