import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, GraduationCap, Users, School } from 'lucide-react';
 

const Feedback_selection = () => {
    const navigate = useNavigate();

    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');
    const [teacherid, setteacherid] = useState();
    const [subjectid, setsubjectid] = useState();

    const [Teachers, setTeachers] = useState([]);
    const [Subjects, setSubjects] = useState([]);

    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('isAdmin') === 'true'; // Retrieve value from localStorage
    });
    
    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin-login'); // Redirect to login page if not authorized
        }
    }, [isAdmin, navigate]);

    const [branches,setbranches] = useState([]);

    useEffect(() => {
      const fetchbranches = async()=>{
        const response = await axios.get('http://localhost:5000/api/fetch-branches');
        setbranches(await response.data[0]);
      }
      fetchbranches();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/feedbacktaken', { state: { branch, semester, subject, teacher, teacherid, subjectid } });
    };

    useEffect(() => {
        const fetchteachers = async () => {
            const response = await axios.post("http://localhost:5000/fetch-teacher", { branch });
            setTeachers(response.data[0]);
        };

        if (branch) {
            fetchteachers();
        }
    }, [branch]);

    useEffect(() => {
        const fetchsubject = async () => {
            const response = await axios.post("http://localhost:5000/fetch-subjects", { branch, semester });
            setSubjects(response.data[0]);
        };

        if (branch && semester) {
            fetchsubject();
        }
    }, [branch, semester]);

    useEffect(() => {
        const selectedTeacher = Teachers.find(a => a.teacher_name === teacher);
        if (selectedTeacher) {
            setteacherid(selectedTeacher.teacher_id);
        }
    }, [teacher, Teachers]);

    useEffect(() => {
        const selectedSubject = Subjects.find(a => a.name === subject);
        if (selectedSubject) {
            setsubjectid(selectedSubject.subject_id);
        }
    }, [subject, Subjects]);

    if (!isAdmin) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-red-500 text-xl font-semibold text-center">
                You are not authorized to access this page.
              </div>
            </div>
          </div>
        );
      }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-500 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Feedback Selection</h2>
            <p className="text-gray-600 mt-2">Select the details for feedback collection</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Branch Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <School className="w-4 h-4 mr-2 text-blue-500" />
                Select Branch
              </label>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-colors"
                >
                  <option value="" disabled>Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Semester Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                Select Semester
              </label>
              <div className="relative">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-colors"
                >
                  <option value="" disabled>Select Semester</option>
                  {branch !== "BCA" ? (
                    Array.from({ length: 8 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}{['st', 'nd', 'rd'][i] || 'th'} Semester
                      </option>
                    ))
                  ) : (
                    Array.from({ length: 6 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}{['st', 'nd', 'rd'][i] || 'th'} Semester
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                Select Subject
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-colors"
                >
                  <option value="" disabled>Select Subject</option>
                  {Subjects.map((subject) => (
                    <option key={subject.subject_id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Teacher Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                Select Teacher
              </label>
              <div className="relative">
                <select
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-colors"
                >
                  <option value="" disabled>Select Teacher</option>
                  {Teachers.map((teacher) => (
                    <option key={teacher.teacher_id} value={teacher.teacher_name}>
                      {teacher.teacher_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Submit Feedback Selection</span>
            </button>
          </form>
        </div>
      </div>
    </div>
)};

export default Feedback_selection;
