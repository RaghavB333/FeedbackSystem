import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
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
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin-home');
        } else {
            console.error('Admin login failed');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Admin Portal</h1>
                <p style={styles.subtitle}>Please log in to access the admin dashboard</p>
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
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        fontFamily: `'Inter', sans-serif`,
    },
    container: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#1976D2', // A refined shade of blue for Admin Portal text
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#555555', // Slightly darker grey for better contrast
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    input: {
        padding: '14px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        outline: 'none',
        transition: 'border 0.3s ease',
    },
    inputFocus: {
        border: '1px solid #1976D2', // Match refined blue for focus
    },
    button: {
        padding: '14px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#1565C0', // Premium darker blue for the button
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease',
    },
    buttonHover: {
        opacity: '0.9',
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    const button = document.querySelector('button');

    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.style.border = styles.inputFocus.border;
        });
        input.addEventListener('blur', () => {
            input.style.border = styles.input.border;
        });
    });

    button.addEventListener('mouseover', () => {
        button.style.opacity = styles.buttonHover.opacity;
    });

    button.addEventListener('mouseout', () => {
        button.style.opacity = '1';
    });
});

export default AdminLogin;


