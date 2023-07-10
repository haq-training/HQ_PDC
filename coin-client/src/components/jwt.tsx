import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
import axios, { AxiosInstance } from 'axios';

type AccessToken = string | null;

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const isValidToken = (accessToken: AccessToken): boolean => {
    if (!accessToken) {
        return false;
    }

    const decoded: any = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

const setSession = (accessToken: AccessToken): void => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

export { isValidToken, setSession, verify, sign };

export default axiosInstance;
