
import React, { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

import { updateCustomer } from "../services/customerService";

const EditCustomer = ({ open, onClose, customer, onCustomerUpdated }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: ""
    });

    const [error, setError] = useState("");

    // Load selected customer's existing details
    useEffect(() => {
        if (customer) {
            setFormData({
                firstName: customer.firstName || "",
                lastName: customer.lastName || "",
                email: customer.email || "",
                phone: customer.phone || "",
                dateOfBirth: customer.dateOfBirth || "",
                address: customer.address || ""
            });
            setError("");
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateCustomer(customer.id, formData);

            onCustomerUpdated();
            onClose();

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update customer."
            );
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle>Edit Customer</DialogTitle>

            <form onSubmit={handleSubmit}>

                <DialogContent dividers>

                    {error && (
                        <p style={{ color: "red" }}>{error}</p>
                    )}

                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ pattern: "[0-9]{10,15}" }}
                    />

                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        multiline
                        rows={2}
                    />

                </DialogContent>

                <DialogActions sx={{ padding: 2 }}>

                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>

                    <Button type="submit" variant="contained">
                        Update Customer
                    </Button>

                </DialogActions>

            </form>

        </Dialog>
    );
};

export default EditCustomer;
