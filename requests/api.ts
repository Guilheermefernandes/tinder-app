import axios from "axios";

export const api = axios.create({
    baseURL: 'https://05f84214f3cb.ngrok-free.app'
})