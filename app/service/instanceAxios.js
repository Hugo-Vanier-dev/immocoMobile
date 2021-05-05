import axios from 'axios';
import {getToken} from '../store/store';


const instance = axios.create({
    baseURL: `http://localhost:8080/ws`,
    timeout: 1000
  });

instance.interceptors.request.use(function (config) {
    const token = getToken();
    if (token !== null) {
        config.headers = { Authorization: 'Bearer ' + token };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;