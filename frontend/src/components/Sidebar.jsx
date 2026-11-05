import React from "react";
import { NavLink } from "react-router-dom";

import {
    Dashboard,
    People,
    AccountBalance,
    Assignment,
    Payments,
    Assessment,
    Settings
} from "@mui/icons-material";

const Sidebar = () => {

    const menuItems = [
        { name: "Dashboard", icon: <Dashboard />, path: "/" },
        { name: "Customers", icon: <People />, path: "/customers" },
        { name: "Loan Products", icon: <AccountBalance />, path: "/loan-products" },
        { name: "Applications", icon: <Assignment />, path: "/applications" },
        { name: "Repayments", icon: <Payments />, path: "/repayments" },
        { name: "Reports", icon: <Assessment />, path: "/reports" },
        { name: "Settings", icon: <Settings />, path: "/settings" }
    ];

    return (
        <div className="sidebar">

            <div className="logo">
                <AccountBalance />
                <h2>LoanSphere</h2>
            </div>

            <p className="menu-heading">MAIN MENU</p>

            <div className="menu-list">

                {menuItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}

            </div>

            <div className="sidebar-footer">
                <p>LoanSphere v1.0</p>
                <small>Loan Operations Platform</small>
            </div>

        </div>
    );
};

export default Sidebar;