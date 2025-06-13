import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const Dashboard = ({ studentData, onLogout, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...studentData });
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [branches, setBranches] = useState([]);
  const [stuBranch, setStuBranch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStuBranch = async () => {
      try {
        const response = await axios.get("https://feedbacksystem-backend-8kxj.onrender.com/api/fetch-student-branches");
        setStuBranch(response.data[0]);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchStuBranch();
  }, []);

  // Fetch branches on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("https://feedbacksystem-backend-8kxj.onrender.com/api/fetch-branches");
        // console.log(response.data); // Check the response data
        setBranches(response.data[0]);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);


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

  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      const rollno = studentData.rollNumber;
      try {
        const response = await axios.post('https://feedbacksystem-backend-8kxj.onrender.com/stu-pass-change', { rollno, newPassword });
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating password:', error);
      }
    } else {
      alert('New password and confirm password do not match!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPassword('');
    setConfirmPassword('');
  }
  // Branch and Semester Options
  const branchOptions = {
    BCA: Array.from({ length: 6 }, (_, i) => `${i + 1}`),
    CSE: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    ME: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    Civil: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Change Password"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            width: '400px',
            margin: 'auto',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: 'none',
            backgroundColor: '#ffffff',
          },
        }}
      >
        {/* Change Password Modal */}
        <div className="space-y-6">
          <div className="text-center pb-4 border-b border-gray-200">
            <h2 className="text-3xl font-bold">Change Password</h2>
            <p className="text-lg mt-2">Enter your new password below</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleChangePassword}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Update Password
            </button>
            <button
              onClick={handleCloseModal}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Student Dashboard</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
              {!isEditing && (
                <button
                  onClick={handleEditToggle}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['name', 'fname', 'contact', 'email', 'address', 'CGPA'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}

                  {/* Branch Select */}
                  <div className="relative">
                    <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                      Branch
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all appearance-none"
                      required
                    >
                      <option value="" disabled hidden>
                        Select your branch
                      </option>
                      {branches.map((branch) => (
                        <option key={branch.branch_id} value={branch.name}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Semester Select */}
                  <div className="relative">
                    <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                      Semester
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all appearance-none"
                      required
                    >
                      <option value="" disabled hidden>
                        Select your semester
                      </option>
                      {branchOptions[formData.branch]?.map((semester) => (
                        <option key={semester} value={semester}>
                          Semester {semester}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries({
                  'Name': studentData.name,
                  "Father's Name": studentData.fname,
                  'Roll Number': studentData.rollNumber,
                  'Contact': studentData.contact,
                  'Email': studentData.email,
                  'Address': studentData.address,
                  'Branch': studentData.branch,
                  'Semester': studentData.semester,
                }).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">{key}</p>
                    <p className="font-medium text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {message && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-center">{message}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Change Password
              </button>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
