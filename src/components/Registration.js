// src/Registration.js
import React, { useState } from 'react';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        fname: '',
        rollNumber: '',
        contact: '',
        email: '',
        address: '',
        department: '',
        semester: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        document.getElementById('message').textContent = 'Registration successful!';
    };

    const departmentOptions = {
        BTECHCSE: Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`), // BTECH CSE
        BTECHME: Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`), // BTECH CE
        BTECHCE: Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`), // BTECH ME
        BCA: Array.from({ length: 6 }, (_, i) => `Semester ${i + 1}`), // BCA
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Registration</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <form id="student-form" onSubmit={handleSubmit}>
                    {/* Name field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Father's Name field */}
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-gray-700 text-sm font-bold mb-2">Father's Name:</label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            required
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your father's name"
                        />
                    </div>

                    {/* Roll Number field */}
                    <div className="mb-4">
                        <label htmlFor="rollNumber" className="block text-gray-700 text-sm font-bold mb-2">Roll Number:</label>
                        <input
                            type="text"
                            id="rollNumber"
                            name="rollNumber"
                            required
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your roll number"
                        />
                    </div>

                    {/* Contact Number field */}
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Contact Number:</label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            required
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your contact number"
                        />
                    </div>

                    {/* Email field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Address field */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your full address"
                        />
                    </div>

                    {/* Department Dropdown */}
                    <div className="mb-4 relative">
                        <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
                            Department:
                        </label>
                        <select
                            id="department"
                            name="department"
                            required
                            value={formData.department}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                        >
                            <option value="" disabled hidden>Select your department</option>
                            <option value="BTECHCSE">BTECH CSE</option>
                            <option value="BTECHME">BTECH ME</option>
                            <option value="BTECHCE">BTECH CE</option>
                            <option value="BCA">BCA</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Semester Dropdown */}
                    <div className="mb-4 relative">
                        <label htmlFor="semester" className="block text-gray-700 text-sm font-bold mb-2">
                            Semester:
                        </label>
                        <select
                            id="semester"
                            name="semester"
                            required
                            value={formData.semester}
                            onChange={handleChange}
                            disabled={!formData.department}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                        >
                            <option value="" disabled hidden>Select your semester</option>
                            {formData.department && departmentOptions[formData.department]?.map((sem, index) => (
                                <option key={index} value={sem}>
                                    {sem}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 top-6 flex items-center px-2 pointer-events-none">
                            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Register
                        </button>
                    </div>
                </form>
                <div id="message" className="mt-4 text-center text-green-500"></div>
            </div>
        </div>
    );
};

export default Registration;
