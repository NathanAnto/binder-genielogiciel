import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <div className="navbar">
                <Link className="nav-link d-flex flex-column align-items-center" to="/bookings">
                    <i className="fas fa-home fa-lg mb-1"></i>
                    <span className="nav-label small">Bookings</span>
                </Link>

                <Link className="nav-link d-flex flex-column align-items-center" to="/">
                    <i className="fas fa-home fa-lg mb-1"></i>
                    <span className="nav-label small">Swipe</span>
                </Link>

                <Link className="nav-link d-flex flex-column align-items-center" to="/profile">
                    <i className="fas fa-home fa-lg mb-1"></i>
                    <span className="nav-label small">Profile</span>
                </Link>
                
            </div>
        </div>
    );
}