import axios from "axios";
import { urlServeBase } from "../app/utils/urlBaseBackend";

export const api = axios.create({
    baseURL: urlServeBase
})