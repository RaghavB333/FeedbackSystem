import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; // Step 1: Ensure this import is here

const Admin_login = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Step 2: Ensure this line is present and inside the component
    const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminCredentials),
            credentials: 'include',
        });

        if (response.ok) {
            login(); // Call the login function from AuthContext
            navigate('/admin-home'); // Redirect after successful login
        } else {
            console.error('Admin login failed');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Admin Login</h1>
            <form onSubmit={handleAdminLogin} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    value={adminCredentials.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    value={adminCredentials.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login as Admin</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '100px auto',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '15px',
    },
    success: {
        color: 'green',
        marginTop: '15px',
    },
};

export default Admin_login;
