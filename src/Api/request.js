import axios from 'axios';

const request = axios.create({
    timeout: 2000
})

request.interceptors.request.use(config => {
    config.headers.Authorization = 'zyh';
    console.log("start request", config);
    return config;
}, error => {
    return Promise.eject(error);
})

request.interceptors.response.use(response => {
    console.log("start response", response);
    return response;
}, error => {
    return Promise.reject(error);
})

export default request;