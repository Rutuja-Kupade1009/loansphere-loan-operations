
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddCustomer from "./pages/AddCustomer";
function App() {
    return (
        <BrowserRouter>
            <div className="app-container">

                <Sidebar />

                <div className="main-content">

                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/customers/add" element={<AddCustomer />} />
                    </Routes>

                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
