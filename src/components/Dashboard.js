import React, { useState } from 'react';

const Dashboard = ({ studentData, onLogout, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...studentData });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onUpdate(formData);
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setMessage('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold">Student Details</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['name', 'fname', 'contact', 'email', 'address', 'department', 'semester'].map((field) => (
                            <div key={field}>
                                <label className="block font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Save Changes</button>
                    </form>
                ) : (
                    <>
                        <p><strong>Name:</strong> {studentData.name}</p>
                        <p><strong>Father's Name:</strong> {studentData.fname}</p>
                        <p><strong>Roll Number:</strong> {studentData.rollNumber}</p>
                        <p><strong>Contact:</strong> {studentData.contact}</p>
                        <p><strong>Email:</strong> {studentData.email}</p>
                        <p><strong>Address:</strong> {studentData.address}</p>
                        <p><strong>Department:</strong> {studentData.department}</p>
                        <p><strong>Semester:</strong> {studentData.semester}</p>
                        <button onClick={handleEditToggle} className="bg-blue-500 text-white py-2 px-4 mr-4 mt-4 rounded-md hover:bg-blue-700">Edit</button>
                    </>
                )}
                {message && <p className="text-center mt-4 text-green-500">{message}</p>}
                <button onClick={onLogout} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
