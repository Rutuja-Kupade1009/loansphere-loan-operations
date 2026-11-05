
import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../services/customerService";
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { deleteCustomer } from "../services/customerService";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { searchCustomers } from "../services/customerService";
import { Pagination } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    useEffect(() => {
        fetchCustomers();
    }, [currentPage, pageSize, sortBy, direction]);
    const showNotification = (message, severity = "success") => {
        setNotification({
            open: true,
            message,
            severity
        });
    };
    const handleCustomerAdded = async () => {
        await fetchCustomers();
        showNotification("Customer added successfully!");
    };

    const handleCustomerUpdated = async () => {
        await fetchCustomers();
        showNotification("Customer updated successfully!");
    };
    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setEditOpen(true);
    };
    const handleDelete = (customer) => {
        setCustomerToDelete(customer);
        setDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteCustomer(customerToDelete.id);

            setDeleteOpen(false);
            setCustomerToDelete(null);

            fetchCustomers();
            showNotification("Customer deleted successfully!");
        } catch (error) {
            console.error("Error deleting customer:", error);
            showNotification("Failed to delete customer!", "error");
        }
    };
    const fetchCustomers = async () => {
        try {
            setLoading(true);

            const data = await searchCustomers(
                "",
                currentPage,
                pageSize,
                sortBy,
                direction
            );

            setCustomers(data.content || []);
            setTotalPages(data.totalPages || 0);
            setError("");

        } catch (err) {
            console.error("Error fetching customers:", err);
            setError("Failed to load customers.");
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <div className="page-container">Loading customers...</div>;
    }

    if (error) {
        return <div className="page-container">{error}</div>;
    }

    return (
        <div className="page-container">

            <h2>Customer Management</h2>
            <p>Manage all registered customers here.</p>
            <div className="customer-actions">
                <Button
                    variant="contained"
                    onClick={() => setOpenForm(true)}
                >
                    + ADD CUSTOMER
                </Button>
            </div>
            <div className="customer-sort-container">
                <FormControl size="small" sx={{ minWidth: 130 }}>
                    <InputLabel>Rows Per Page</InputLabel>

                    <Select
                        value={pageSize}
                        label="Rows Per Page"
                        onChange={(e) => {
                            setPageSize(e.target.value);
                            setCurrentPage(0);
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel>Sort By</InputLabel>

                    <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <MenuItem value="id">Customer ID</MenuItem>
                        <MenuItem value="firstName">First Name</MenuItem>
                        <MenuItem value="lastName">Last Name</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="createdAt">Created Date</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Direction</InputLabel>

                    <Select
                        value={direction}
                        label="Direction"
                        onChange={(e) => setDirection(e.target.value)}
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>

            </div>
            <div className="customer-table-container">
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                    <td>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(customer)}
                                            title="Edit Customer"
                                        >
                                            <EditIcon />

                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(customer)}
                                            title="Delete Customer"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No customers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p>Total Customers: {customers.length}</p>
            <AddCustomer
                open={openForm}
                onClose={() => setOpenForm(false)}
                onCustomerAdded={handleCustomerAdded}
            />
            <EditCustomer
                open={editOpen}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedCustomer(null);
                }}
                customer={selectedCustomer}
                onCustomerUpdated={handleCustomerUpdated}
            />
            <Dialog
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
            >
                <DialogTitle>Delete Customer</DialogTitle>

                <DialogContent>
                    Are you sure you want to delete{" "}
                    <strong>
                        {customerToDelete?.firstName} {customerToDelete?.lastName}
                    </strong>?
                    <p>This action cannot be undone.</p>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={confirmDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="pagination-container">

                <p>
                    Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
                </p>

                <Pagination
                    count={totalPages}
                    page={currentPage + 1}
                    onChange={(event, value) => setCurrentPage(value - 1)}
                    color="primary"
                    shape="rounded"
                />

            </div>
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={() =>
                    setNotification(prev => ({
                        ...prev,
                        open: false
                    }))
                }
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <Alert
                    severity={notification.severity}
                    variant="filled"
                    onClose={() =>
                        setNotification(prev => ({
                            ...prev,
                            open: false
                        }))
                    }
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomerList;
