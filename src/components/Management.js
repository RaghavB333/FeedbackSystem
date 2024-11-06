import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Management = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newTeacher, setnewTeacher] = useState('');
  const [branch, setBranch] = useState([]);
  const [newbranch, setnewbranch] = useState('');
  const [branches, setbranches] = useState([]);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true'; // Retrieve value from localStorage
  });

  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  const fetchAllTeachers = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetch-all-teachers');
      console.log('Fetched Teachers:', response.data);  // Log to ensure the correct data is received
      setTeachers(response.data);  // Set the state with the list of teachers
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };


  useEffect(() => {


    fetchAllTeachers();
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login'); // Redirect to login page if not authorized
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        if (branch.length === 0) {
          console.error('No branches selected');
          return;
        }
        const response = await axios.post('http://localhost:5000/api/fetch-teacher', { branch });
        setTeachers(response.data); // Assuming response.data contains the list of teachers
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, [branch]);





  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const response = await axios.post('http://localhost:5000/api/admin-pass-change', { newPassword });
      alert("Password Changed");
    } else {
      alert("Passwords do not match");
    }
  };



  const addnewteacher = async () => {
    if (newTeacher && branch.length > 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/add-new-teacher', { newTeacher, branch });
        // Refresh the list of teachers after adding a new one
        alert('Teacher added successfully');
        // Optionally, fetch teachers again
        fetchAllTeachers();
      } catch (error) {
        console.error('Error adding new teacher:', error);
        alert('Error adding new teacher');
      }
    } else {
      alert('Enter Teacher name and Select the Branch');
    }
  };


  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setBranch((prev) => {
      const updatedBranches = Array.isArray(prev) ? prev : [];
      if (updatedBranches.includes(value)) {
        return updatedBranches.filter((b) => b !== value);
      } else {
        return [...updatedBranches, value];
      }
    });
  };


  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete-teacher/${teacherId}`);
      if (response.data.success) {
        alert('Teacher deleted successfully');
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.teacher_id !== teacherId));
      } else {
        alert('Failed to delete teacher');
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert('Error deleting teacher');
    }
  };


  const [subject, setsubject] = useState('');
  const [semester, setsemester] = useState('');
  const [subjectid, setsubjectid] = useState('');

  const handleAddValue = async () => {
    if (newbranch && semester && subjectid && subject) {
      const response = await axios.post('http://localhost:5000/api/add-brach-semester-subject', { newbranch, semester, subjectid, subject });
    } else {
      alert("Enter branch name, semester, subject code and subject name");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Admin Management Panel</h2>

      {/* Change Password Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Add Teacher Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Teacher</h3>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Teacher Name"
            value={newTeacher}
            onChange={(e) => setnewTeacher(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Select Branch for Teacher:</label>
            <div className="space-y-2">
              {branches.map((branchItem) => (
                <div key={branchItem.branch_id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={branchItem.branch_id.toString()}
                    checked={branch.includes(branchItem.branch_id.toString())}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-500"
                  />
                  <label className="text-gray-700">{branchItem.name}</label>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={addnewteacher}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Teacher
          </button>
        </form>
      </section>

      {/* Add Branch & Subject Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Branch & Subject</h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newbranch}
              onChange={(e) => setnewbranch(e.target.value)}
              placeholder="Branch Name"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              value={semester}
              onChange={(e) => setsemester(e.target.value)}
              placeholder="Semester"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={subjectid}
              onChange={(e) => setsubjectid(e.target.value)}
              placeholder="Subject Code"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}
              placeholder="Subject Name"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            onClick={handleAddValue}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </div>
      </section>

      {/* Teacher List Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Teacher List</h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/2 py-3 px-6 border-b border-gray-300 text-center">Teacher Name</th>
              <th className="w-1/2 py-3 px-6 border-b border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.teacher_id} className="hover:bg-gray-50">
                <td className="py-3 px-6 border-b border-gray-300 text-center">{teacher.teacher_name}</td>
                <td className="py-3 px-6 border-b border-gray-300 text-center">
                  <button
                    onClick={() => handleDeleteTeacher(teacher.teacher_id)}
                    className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-all duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default Management;
