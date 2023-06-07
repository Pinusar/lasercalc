import axios from "axios";
import {apiBaseUrl} from "@/repository/apiConfig";

export async function get(endpoint) {
    let r = await axios.get(apiBaseUrl + endpoint);
    return r.data;
}
export async function post(endpoint, data) {
    let r = await axios.post(apiBaseUrl + endpoint, data);
    return r.data;
}