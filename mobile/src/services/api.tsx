import axios from 'axios';

const api = axios.create({
    baseURL: "http://172.17.89.189:3333/"
});

export default api;