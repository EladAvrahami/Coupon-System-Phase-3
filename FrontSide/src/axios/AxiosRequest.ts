import axios from 'axios';
import {UserInterface} from "../interfaces/UserInterface";

// const userInfo: UserInterface = JSON.parse(localStorage.getItem("user"));

const AxiosRequest = axios.create({
    baseURL: "http://localhost:8080",
    headers: {"Content-Type": "application/json"}
});

export default AxiosRequest;

AxiosRequest.interceptors.request.use(
    (config) => {
        const token = (JSON.parse(localStorage.getItem("user")) as UserInterface).token;
        if (token) config.headers.authorization = token;
        return config;
    },
    (error) => Promise.reject(error),
);