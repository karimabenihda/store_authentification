import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { BsCart4 } from "react-icons/bs";
function Navbar() {
    const { user } = useSelector((state) => state.auth); 
    const cartItemLength = useSelector(state => state.cart.items.length); 
 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">KIl SHOPPING</Link> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart"><BsCart4/>({cartItemLength})</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {!user ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/auth"><FiLogIn /> Login</Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/auth"><FiLogOut /> Logout</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
