
import { useEffect, useState } from "react";
import {
    People,
    AccountBalance,
    Assignment,
    Payments
} from "@mui/icons-material";

import { getAllCustomers } from "../services/customerService";

function Dashboard() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await getAllCustomers();
            setCustomers(data);
        } catch (err) {
            console.error("Error fetching customers:", err);
            setError("Unable to load customers. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        {
            title: "Total Customers",
            value: customers.length,
            icon: <People />,
            className: "blue"
        },
        {
            title: "Active Loans",
            value: 0,
            icon: <AccountBalance />,
            className: "green"
        },
        {
            title: "Pending Applications",
            value: 0,
            icon: <Assignment />,
            className: "orange"
        },
        {
            title: "Total Repayments",
            value: "₹0",
            icon: <Payments />,
            className: "purple"
        }
    ];

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <p>Welcome back! Here's your loan operations overview.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <div className={`stat-icon ${stat.className}`}>
                            {stat.icon}
                        </div>

                        <div>
                            <p>{stat.title}</p>
                            <h2>{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="recent-customers">
                <div className="section-header">
                    <h3>Recent Customers</h3>
                    <button>View All</button>
                </div>

                {loading ? (
                    <p>Loading customers...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : customers.length === 0 ? (
                    <p>No customers yet.</p>
                ) : (
                    <div className="customer-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customers.slice(-5).reverse().map(customer => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>
                                            {customer.firstName} {customer.lastName}
                                        </td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Dashboard;
