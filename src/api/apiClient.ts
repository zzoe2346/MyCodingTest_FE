import axios from 'axios';

axios.defaults.withCredentials = true

const apiClient = axios.create({
    // for DEV
    // baseURL: 'https://localhost:8443',
    // baseURL: 'http://localhost:8080',

    // for OPERATION
    baseURL: 'https://api.mycodingtest.com',

    withCredentials: true
});

export default apiClient;
