
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});

// Get all customers
export const getAllCustomers = async () => {
    const response = await API.get("/customers");
    return response.data;
};

// Search customers with pagination and sorting
export const searchCustomers = async (
    keyword,
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
) => {
    const response = await API.get("/customers/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });

    return response.data;
};
