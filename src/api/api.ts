import axios from 'axios';

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'https://localhost:8443',
    withCredentials: true,            // 쿠키 포함 설정
});

export default api;
