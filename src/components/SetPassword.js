import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Retrieve roll number from session storage
    const rollNumber = sessionStorage.getItem('rollNumber');

    useEffect(() => {
        if (!rollNumber) {
            navigate('/register'); // Redirect to register if roll number is not found
        }
    }, [rollNumber, navigate]);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/set-password', { rollNumber, password });
            setMessage(response.data);
            navigate('/dashboard'); // Redirect to dashboard after setting password
        } catch (error) {
            const errorMessage = `Failed to set password. ${error.response ? error.response.data : error.message}`;
            setMessage(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handlePasswordSubmit} className='flex flex-col items-center space-y-4 bg-white p-8 rounded shadow-md'>
                <h2 className="text-2xl mb-4">Set Password</h2>
                <label htmlFor="setpass" className="text-gray-700">Enter Password</label>
                <input 
                    type="password" 
                    id='setpass'
                    placeholder="Enter Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    minLength={8} 
                    className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label htmlFor="cpass" className="text-gray-700">Confirm Password</label>
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    id='cpass'
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required
                    minLength={8} 
                    className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Set Password
                </button>
                {message && <div className="text-red-500 mt-2">{message}</div>}
            </form>
        </div>
    );
};

export default SetPassword;
