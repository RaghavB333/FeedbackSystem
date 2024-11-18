// Display_result.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Book, ChevronRight, Star } from 'lucide-react';

const Display_result = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  // Get admin status from context
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true'; // Retrieve value from localStorage
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login'); // Redirect to login page if not authorized
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await axios.get('http://localhost:5000/api/fetch-feedbacks');
      setFeedbacks(response.data[0]);
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (feedbacks) console.log(feedbacks);
  }, [feedbacks]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0');

      return `${month} ${day}, ${year} • ${formattedHours}:${minutes} ${ampm}`;
    } catch {
      return dateString;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 4) return 'text-green-600 bg-green-50';
    if (score >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const metrics = [
    { key: 'avg_subject_knowledge', label: 'Subject Knowledge' },
    { key: 'avg_communication_effectiveness', label: 'Communication Effectiveness' },
    { key: 'avg_communication_clarity', label: 'Communication Clarity' },
    { key: 'avg_engagement', label: 'Engagement' },
    { key: 'avg_participation', label: 'Participation' },
    { key: 'avg_responsiveness_approachability', label: 'Approachability' },
    { key: 'avg_responsiveness_effectiveness', label: 'Responsiveness' },
    { key: 'avg_punctuality', label: 'Punctuality' },
    { key: 'avg_preparedness', label: 'Preparedness' },
    { key: 'avg_critical_thinking', label: 'Critical Thinking' },
    { key: 'avg_syllabus_coverage', label: 'Syllabus Coverage' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback Results</h2>
        <div className="space-y-6">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.feedback_id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate('/evaluation', {
                state: {
                  feedback_id: feedback.feedback_id,
                  teacherid: feedback.teacher_id,
                  teacher_name: feedback.teacher_name,
                  subject: feedback.name
                }
              })}
            >
              <div className="p-6 relative">
                {/* Overall score at the top-right */}
                <div
                  className={`absolute top-4 right-4 py-1 px-3 rounded-md text-xl font-semibold ${getScoreColor(feedback.overall_score)}`}
                > Overall Score -   
                   {Number(feedback.overall_score).toFixed(1)}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {feedback.teacher_name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">ID: {feedback.teacher_id}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center text-gray-500 font-bold">
                    <Book className="w-4 h-4 mr-2" />
                    {feedback.name}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(feedback.last_updated)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {metrics.map(({ key, label }) => (
                    <div key={key} className="p-3 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">{label}</div>
                      <div
                        className={`text-lg font-semibold rounded-md px-2 py-1 inline-block ${getScoreColor(feedback[key])}`}
                      >
                        {Number(feedback[key]).toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



const styles = {
  h2: {
    textAlign: 'center',
    fontSize: '20px'
  },
  teacherCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '80%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    margin: '10px auto'
  },
  table: {
    // marginLeft: "10%",
    width: '80%',
    borderCollapse: 'collapse',
    // marginTop: '20px'
  },
  th: {
    // padding: '10px',
    border: '1px solid black',
    padding: '7px 1.5px',
    backgroundColor: '#f5f5f5',
    fontSize: '10px',
  },
  td: {
    // padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center'
  },
};

export default Display_result;
