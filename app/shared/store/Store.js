import { configureStore } from '@reduxjs/toolkit';
import defaultStore from './initialStoreValue';

function reducer(state = defaultStore, action) {
    switch(action.type) {
        case 'set/token' :
            return {
                ...state,
                token: action.payload.token
            }
        case 'set/userData' :
            return {
                ...state,
                userData : action.payload.userData
            }
        case 'set/isLoggedInTrue' :
            return {
                ...state,
                isLoggedIn: true
            }
        default :
            return state
    }
}

const Store = configureStore({reducer: reducer});

export default Store;