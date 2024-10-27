// src/StudentDashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [message, setMessage] = useState('');

    const handleFetchData = async () => {
        setMessage('');
        try {
            const response = await axios.get(`http://localhost:5000/student/${rollNumber}`);
            setStudentData(response.data);
        } catch (error) {
            console.error('Error fetching student data:', error);
            setMessage('Student not found. Please check the roll number.');
            setStudentData(null); // Reset student data
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label htmlFor="rollNumber" className="block text-gray-700 text-sm font-bold mb-2">Enter Roll Number:</label>
                    <input
                        type="text"
                        id="rollNumber"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter roll number"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleFetchData}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Fetch Student Data
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
