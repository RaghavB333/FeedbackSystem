import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin}) => {
    const [rollNumber, setRollNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { rollNumber, password });
            const studentData = response.data;
            onLogin(studentData);

            // Determine the target page based on referrer and navigate with replace
            // const targetPath = referrer === 'feedbackForm' ? '/feedbackForm' : '/dashboard';
            navigate('/dashboard', { replace: true });

            // Clear the referrer to prevent accidental redirection loops
            // clearReferrer();
        } catch (error) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Student Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            placeholder="Roll Number"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                    {message && <p className="text-red-600 text-center">{message}</p>}
                    <p className="text-blue-600 text-center"><a href='http://localhost:3000/forget-password'>Forget Password</a></p>
                    
                </form>
            </div>
        </div>
    );
};

export default Login;
