import axios from "axios";

const baseURL = 'https://recipes-nestjs-production.up.railway.app/api/v1/';

const api = axios.create({
    baseURL,
    headers: {
        'Accept': 'application/json'
    }
})

export default api;
