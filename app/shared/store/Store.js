import { configureStore } from '@reduxjs/toolkit';
import defaultStore from './initialStoreValue';

function reducer(state = defaultStore, action) {
    switch(action.type) {
        case 'connexion' :
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token
            }
        case 'set/userData' :
            return {
                ...state,
                userData : action.payload.userData
            }
        default :
            return state
    }
}

const Store = configureStore({reducer: reducer});

export default Store;