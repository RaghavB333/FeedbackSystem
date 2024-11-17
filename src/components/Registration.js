import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  User,
  Phone,
  Mail,
  MapPin,
  BookOpen,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    fname: "",
    rollNumber: "",
    contact: "",
    email: "",
    address: "",
    branch: "", // Renamed 'department' to 'branch'
    semester: "",
    CGPA: ""
  });

  const [message, setMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]); // Dynamic semester options
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fetch-branches");
        setBranches(response.data[0]);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  // Dynamically update semester options based on selected branch
  useEffect(() => {
    if (formData.branch) {
      setSemesters(branchOptions[formData.branch] || []);
    } else {
      setSemesters([]); // Reset semesters if no branch selected
    }
  }, [formData.branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "branch" ? { semester: "" } : {}), // Reset semester if branch changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submit

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      setMessage(response.data);

      sessionStorage.setItem("rollNumber", formData.rollNumber);
      navigate("/setPassword");
    } catch (error) {
      const errorMessage = `Failed to register. ${
        error.response ? error.response.data : error.message
      } Please try again.`;
      setMessage(errorMessage);
    }
  };

  const branchOptions = {
    BCA: Array.from({ length: 6 }, (_, i) => `${i + 1}`),
    CSE: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    ME: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
    Civil: Array.from({ length: 8 }, (_, i) => `${i + 1}`),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Student Registration
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Please fill in your details below
          </p>
        </div>

        <div className="bg-white/50 border-2 border-blue-100 shadow-xl rounded-xl backdrop-blur-sm">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="relative">
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Father's Name Input */}
                <div className="relative">
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your father's name"
                    required
                  />
                </div>

                {/* Roll Number Input */}
                <div className="relative">
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your roll number"
                    required
                  />
                </div>

                {/* Contact Input */}
                <div className="relative">
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                 {/* Branch Select */}
              <div className="relative">
                <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Branch
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 rounded-lg"
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
                  <BookOpen className="w-4 h-4 mr-2" />
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  disabled={!formData.branch}
                  className="w-full px-4 py-2 border-2 rounded-lg"
                  required
                >
                  <option value="" disabled hidden>
                    Select your semester
                  </option>
                  {semesters.map((sem, index) => (
                    <option key={index} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
                  {formData.semester == 1 ?
              <div className="relative">
                <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Enter 12th Marks
                </label>
                <input
                  name="CGPA"
                  value={formData.CGPA}
                  onChange={handleChange}
                  disabled={!formData.semester}
                  className="w-full px-4 py-2 border-2 rounded-lg"
                  required
                />
              </div>:
              <div className="relative">
              <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                <BookOpen className="w-4 h-4 mr-2" />
                CGPA
              </label>
              <input
                name="CGPA"
                value={formData.CGPA}
                onChange={handleChange}
                disabled={!formData.semester}
                className="w-full px-4 py-2 border-2 rounded-lg"
                required
              />
            </div>}
              </div>

              {/* Address Input - Full Width */}
              <div className="relative">
                <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="Enter your full address"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform transition-all hover:-translate-y-0.5"
                >
                  Register Now
                </button>
              </div>
            </form>

            {/* Success Message */}
            {message && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
