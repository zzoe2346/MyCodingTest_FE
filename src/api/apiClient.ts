import axios from 'axios';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true

const apiClient = axios.create({
    // for DEV
    // baseURL: 'https://localhost:8443',
    //baseURL: 'http://localhost:8080',

    // for OPERATION
    baseURL: 'https://api.mycodingtest.com',

    withCredentials: true
});

let navigate: (path: string) => void;
export const NavigateSetter = () => {
    navigate = useNavigate();
    return null;
};


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { response } = error;

            if (response.status === 401) {
                console.log('not login');
            } else {
                navigate(`/error?status=${encodeURIComponent(response.status)}&title=${encodeURIComponent(response.data.title)}&detail=${encodeURIComponent(response.data.detail)}`);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
