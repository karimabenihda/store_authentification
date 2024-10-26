import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { BsCart4 } from "react-icons/bs";
import { logout } from '../reducers/authSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { user } = useSelector((state) => state.auth); 
    const cartItemLength = useSelector(state => state.cart.items.length); 

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/home'); 
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/home">KIl SHOPPING</Link> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart"><BsCart4 />({cartItemLength})</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {!user ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/auth"><FiLogIn /> Login</Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <button className="nav-link btn" onClick={handleLogout} style={{ border: 'none', background: 'none', padding: 0 }}>
                                    <FiLogOut /> Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
