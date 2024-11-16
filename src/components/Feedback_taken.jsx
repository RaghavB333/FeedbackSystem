import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Send, Users, X, Save, Search } from 'lucide-react';


const Feedback_taken = ({ onUpdate }) => {

  const [students, setStudents] = useState([]);
  const [formData, setformData] = useState([]);
  const [feedbackid, setfeedbackid] = useState('');
  const [isEditing, setisEditing] = useState(false);
  const [change, setchange] = useState('');
  const [rollNumber, setrollNumber] = useState('');
  const location = useLocation();
  const { branch, semester, subject, teacher, teacherid, subjectid } = location.state || {};
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);


  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredStudents = searchTerm
    ? students.filter(student =>
      Object.values(student).some(value =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    : students;


  const cancelEdit = () => {
    setisEditing(false);
  };


  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true'; // Retrieve value from localStorage
  });

  // Fetch branches on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fetch-branches");
        // console.log(response.data); // Check the response data
        setBranches(response.data[0]);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);
  // Branch and Semester Options
  const branchOptions = {
    BCA: Array.from({ length: 6 }, (_, i) => `${i + 1}`),
    CSE: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    ME: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    Civil: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
  };



  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login'); // Redirect to login page if not authorized
    }
  }, [isAdmin, navigate]);


  useEffect(() => {
    // Fetch students data if branch and semester are available
    if (branch && semester) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/students', {
            params: { branch, semester }
          });
          setStudents(response.data[0]);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };
      fetchStudents();
    }
  }, [branch, semester, change]);


  const createfeedback = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:5000/api/feedback-created', { teacherid, subjectid });

      setfeedbackid(await response.data.insertId);


    } catch (error) {
      console.error("Feedback not created", error);
    }
  }

  useEffect(() => {
    const sendMessage = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/send-feedback-link",
          { feedbackid, students, subject, teacher }

        );
        alert(response.data.message);
      } catch (error) {
        console.error("Error sending messages:", error);
        alert("Failed to send messages.");
      }
    };
    if (feedbackid) {
      sendMessage();
    }
  }, [feedbackid])

  const deletestudent = async (rollno) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-student",
        { rollno }
      );
      setchange(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const editstudent = (rollno) => {
    setrollNumber(rollno);

    for (let student = 0; student < students.length; student++) {
      if (students[student].rollNumber == rollno) {
        setformData(students[student]);
      }
    }

    setisEditing(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setchange('');
      setisEditing(false);
    } catch (error) {
      console.error(error)
    }
  }

  return (

    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Student List</h2>
          </div>
          {!isEditing && students.length > 0 && (
            <button
              onClick={createfeedback}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Take Feedback
            </button>
          )}
        </div>

        {students.length > 0 ? (
          <>
            {isEditing ? (
              // Edit Form
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Student Information</h3>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['name', 'fname', 'contact', 'email', 'address'].map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field] || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  ))}

                  {/* Branch Field */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

                  {/* Semester Field */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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


                  <div className="md:col-span-2 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Student List
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Roll Number', 'Name', 'Father Name', 'Email', 'Contact', 'Branch', 'Semester', 'Actions'].map((header) => (
                          <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <tr key={student.rollNumber} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.fname}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.contact}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.branch}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.semester}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                            <button
                              onClick={() => editstudent(student.rollNumber)}
                              className="inline-flex items-center p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletestudent(student.rollNumber)}
                              className="inline-flex items-center p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No Students Found</h3>
            <p className="mt-1 text-gray-500">No students found for the selected branch and semester.</p>
          </div>
        )}
      </div>
    </div>
  )
};

export default Feedback_taken
