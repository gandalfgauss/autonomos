import axios from "axios";

export const Api = axios.create({
    baseURL: "http://192.168.2.7:3000"
})