
import { useEffect, useState } from "react";
import {
    Search,
    Notifications,
    AccountCircle,
    Close
} from "@mui/icons-material";

import { searchCustomers } from "../services/customerService";

function Navbar() {

    const [keyword, setKeyword] = useState("");
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {

        if (!keyword.trim()) {
            setCustomers([]);
            setError("");
            setLoading(false);
            return;
        }

        const timer = setTimeout(async () => {

            try {
                setLoading(true);
                setError("");

                const data = await searchCustomers(
                    keyword.trim(),
                    0,
                    10,
                    "id",
                    "desc"
                );

                setCustomers(data.content || []);
                setShowResults(true);

            } catch (err) {
                console.error("Customer search failed:", err);
                setError("Unable to search customers.");
                setCustomers([]);

            } finally {
                setLoading(false);
            }

        }, 400);

        // Clear previous timer when user types again
        return () => clearTimeout(timer);

    }, [keyword]);

    const clearSearch = () => {
        setKeyword("");
        setCustomers([]);
        setError("");
        setShowResults(false);
    };

    return (
        <header className="navbar">

            <div className="navbar-search-container">

                <div className="search-box">
                    <Search />

                    <input
                        type="text"
                        placeholder="Search customers by name, email or phone..."
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            setShowResults(true);
                        }}
                        onFocus={() => {
                            if (keyword.trim()) {
                                setShowResults(true);
                            }
                        }}
                    />

                    {keyword && (
                        <button
                            className="clear-search"
                            onClick={clearSearch}
                            type="button"
                            aria-label="Clear search"
                        >
                            <Close />
                        </button>
                    )}
                </div>

                {showResults && keyword.trim() && (
                    <div className="search-results">

                        {loading && (
                            <p className="search-message">
                                Searching customers...
                            </p>
                        )}

                        {!loading && error && (
                            <p className="search-error">{error}</p>
                        )}

                        {!loading && !error && customers.length === 0 && (
                            <p className="search-message">
                                No matching customers found.
                            </p>
                        )}

                        {!loading && !error && customers.length > 0 && (
                            <>
                                <div className="search-results-heading">
                                    Search Results ({customers.length})
                                </div>

                                {customers.map((customer) => (
                                    <div
                                        className="search-result-item"
                                        key={customer.id}
                                    >
                                        <div className="customer-avatar">
                                            {customer.firstName?.charAt(0)}
                                        </div>

                                        <div className="search-customer-info">
                                            <strong>
                                                {customer.firstName}{" "}
                                                {customer.lastName}
                                            </strong>

                                            <span>{customer.email}</span>

                                            <small>{customer.phone}</small>
                                        </div>

                                        <span className="customer-id">
                                            #{customer.id}
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}

                    </div>
                )}

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

        </header>
    );
}

export default Navbar;
