import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Navbar.css';

function Navbar({ user, onLogout }){
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
        <div className="navbar-container">
            {/* Logo / App Title */}
            <div className="navbar-logo">
            <h1>💰 Expense Tracker</h1>
            </div>

            {/* User Info and Logout */}
            <div className="navbar-right">
            {user && <span className="user-name">Hi, {user.name}!</span>}
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
            </div>
        </div>
        </nav>
    );
}

export default Navbar;