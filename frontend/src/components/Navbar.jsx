
import React from "react";
import {
    Search,
    Notifications,
    AccountCircle
} from "@mui/icons-material";

const Navbar = () => {

    return (
        <div className="navbar">

            <div className="search-box">
                <Search />
                <input
                    type="text"
                    placeholder="Search anything..."
                />
            </div>

            <div className="navbar-right">

                <Notifications className="notification-icon" />

                <div className="profile">
                    <AccountCircle />
                    <div>
                        <strong>Admin User</strong>
                        <small>Administrator</small>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Navbar;
