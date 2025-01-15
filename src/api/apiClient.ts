import axios from 'axios';

axios.defaults.withCredentials = true

const apiClient = axios.create({
    // baseURL: 'https://localhost:8443',
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

export default apiClient;
