// src/StudentDashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [password, setPassword] = useState(''); // New state for password
    const [studentData, setStudentData] = useState(null);
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        setMessage('');
        try {
            // Send login request to the server
            const response = await axios.post('http://localhost:5000/login', { rollNumber, password });
            setStudentData(response.data); // Set the received student data
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Login failed. Please check your credentials.');
            setStudentData(null); // Reset student data
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label htmlFor="rollNumber" className="block text-gray-700 text-sm font-bold mb-2">Roll Number:</label>
                    <input
                        type="text"
                        id="rollNumber"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter roll number"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleLogin} // Change to handleLogin
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>

                {message && (
                    <div className="mt-4 text-center text-red-500 font-bold">{message}</div>
                )}

                {studentData && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold">Student Details</h2>
                        <p><strong>Name:</strong> {studentData.name}</p>
                        <p><strong>Father's Name:</strong> {studentData.fname}</p>
                        <p><strong>Roll Number:</strong> {studentData.rollNumber}</p>
                        <p><strong>Contact:</strong> {studentData.contact}</p>
                        <p><strong>Email:</strong> {studentData.email}</p>
                        <p><strong>Address:</strong> {studentData.address}</p>
                        <p><strong>Department:</strong> {studentData.department}</p>
                        <p><strong>Semester:</strong> {studentData.semester}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
