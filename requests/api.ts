import axios from "axios";
import { urlServeBase } from "../utils/urlBaseBackend";

export const api = axios.create({
    baseURL: urlServeBase
})