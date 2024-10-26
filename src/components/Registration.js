// src/Registration.js
import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log('Form Data Submitted:', formData);
    document.getElementById('message').textContent = 'Registration successful!';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Registration</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form id="student-form" onSubmit={handleSubmit}>
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
