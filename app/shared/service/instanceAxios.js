import axios from 'axios';
import Store from '../store/Store';


const instance = axios.create({
    baseURL: `http://localhost:8000/api`,
    timeout: 1000
  });

instance.interceptors.request.use(function (config) {
    const token = Store.getState().token;
    console.log(token);
    if (token !== null) {
        config.headers = { Authorization: 'Bearer ' + token.token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;