import React from 'react';
import store from './app/store/store'
import Login from './app/components/shared/login/login';

function Router () {
    const isLoggedIn = store.getState().isLoggedIn;
    if(isLoggedIn) {
        return (
            <Login />
        );
    }else {
         return (
            <Login />
         );
    }
}

export default Router;