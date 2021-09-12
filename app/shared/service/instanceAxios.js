import axios from 'axios';
import Store from '../store/Store';


const instance = axios.create({
    baseURL: `https://fierce-cove-97875.herokuapp.com/api`,
    timeout: 1000
  });

instance.interceptors.request.use(function (config) {
    const token = Store.getState().token;
    if (token !== null) {
        config.headers = { Authorization: 'Bearer ' + token.token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;