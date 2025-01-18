import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar fixed-bottom">
            <ul className="nav justify-content-center w-100">
                <li className="nav-item flex-fill text-center">
                    <Link className="nav-link d-flex flex-column align-items-center" to="/">
                        <i className="fas fa-home fa-lg mb-1"></i>
                        <span className="nav-label small">Home</span>
                    </Link>
                </li>
                <li className="nav-item flex-fill text-center">
                    <Link className="nav-link d-flex flex-column align-items-center" to="/swipe">
                        <i className="fas fa-heart fa-lg mb-1"></i>
                        <span className="nav-label small">Swipe</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}