import { configureStore } from '@reduxjs/toolkit';
import defaultStore from './initialStoreValue';

function reducer(state = defaultStore, action) {
    switch(action.type) {
        case 'connexion' :
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload.user,
                token: action.payload.token
            }
    }
    return state;
}

const store = configureStore({reducer: reducer});

export default store;