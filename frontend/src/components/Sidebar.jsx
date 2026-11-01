
import React from "react";
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
        { name: "Dashboard", icon: <Dashboard />, active: true },
        { name: "Customers", icon: <People /> },
        { name: "Loan Products", icon: <AccountBalance /> },
        { name: "Applications", icon: <Assignment /> },
        { name: "Repayments", icon: <Payments /> },
        { name: "Reports", icon: <Assessment /> },
        { name: "Settings", icon: <Settings /> }
    ];

    return (
        <div className="sidebar">

            <div className="logo">
                <AccountBalance />
                <h2>LoanSphere</h2>
            </div>

            <p className="menu-heading">MAIN MENU</p>

            <div className="menu-list">
                {menuItems.map((item, index) => (
                    <div
                        className={`menu-item ${item.active ? "active" : ""}`}
                        key={index}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
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
