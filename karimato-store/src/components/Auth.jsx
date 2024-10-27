import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, logout } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Attempting login with:", { username, password });
        dispatch(authenticateUser({ username, password }));
    };
     

    const handleLogout = () => {
        console.log("Logging out"); 
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {
        console.log("User state changed:", user);
        if (user) {
            console.log("Navigating to '/home'");
            navigate('/home'); 
        }
    }, [user, navigate]); 

    return (
        <div>
            <h2>Authentication</h2>
            {!user ? (
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
            ) : (
                <div>
                    <p>Welcome, {user.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Auth;
