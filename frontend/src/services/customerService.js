
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});

export const getAllCustomers = async () => {
    const response = await API.get("/customers");
    return response.data;
};
