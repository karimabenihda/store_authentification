import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, login, logout } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user, role, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {
        if (user) {
            navigate('/');
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
