import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const Dashboard = ({ studentData, onLogout, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...studentData });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

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

  const [isModalOpen, setIsModalOpen] = useState(false);
//   const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async() => {
    if (newPassword === confirmPassword) {
      
        let username = studentData.rollNumber;
        const response = await axios.post('http://localhost:5000/stu-pass-change', {username, newPassword});

        console.log(response.data);


      setIsModalOpen(false); // Close modal after success
    } else {
      alert('New password and confirm password do not match!');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

    return (
        <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Change Password"
        style={{
          content: {
            width: '30%',
            height: '50%',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
          },
        }}
      >
        <h2>Change Password</h2>
        {/* <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '8px' }}
        /> */}
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ display: 'block', border: '1px solid black', margin: '10px auto', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ display: 'block', border: '1px solid black', margin: '10px auto', padding: '8px' }}
        />
        <button onClick={handleChangePassword} style={{ margin: '10px' }} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        <button onClick={handleCloseModal} style={{ margin: '10px' }} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </Modal>
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
                <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Change Password</button>
                <button onClick={onLogout} className="mt-4 ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
        </div>
        </>
    );
};

export default Dashboard;
