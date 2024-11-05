import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function FeedbackForm() {


    const location = useLocation();

  //   // Parse the query parameters directly from the URL
    const queryParams = new URLSearchParams(location.search);
    const feedbackid = queryParams.get('feedbackid');
    const name = queryParams.get('name');
    const subject = queryParams.get('subject');
    const teacher = queryParams.get('teacher');
    const expirytime = queryParams.get('expiryTime');
    const navigate = useNavigate();
    const { isAdmin } = useAuth(); // Get admin status from context


    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin-login'); // Redirect to login page if not authorized
        }
    }, [isAdmin, navigate]);


    const [formData, setFormData] = useState({
        teacher_id: 1, // Default teacher_id
        ratings: {
            avg_subject_knowledge: '',
            avg_communication_effectiveness: '',
            avg_communication_clarity: '',
            avg_engagement: '',
            avg_participation: '',
            avg_responsiveness_approachability: '',
            avg_responsiveness_effectiveness: '',
            avg_punctuality: '',
            avg_preparedness: '',
            avg_critical_thinking: ''
        },
        // student_id: '' // Initially empty
    });

    // Fetch the student ID and teacher list on mount
    // useEffect(() => {
    //     fetch('/api/getStudentId')
    //         .then(response => response.json())
    //         .then(data => setFormData(prev => ({ ...prev, student_id: data.student_id })))
    //         .catch(error => console.error("Error fetching student ID:", error));

    //     fetch('/api/getTeachers')
    //         .then(response => response.json())
    //         .then(data => setTeacherOptions(data))
    //         .catch(error => console.error("Error fetching teachers:", error));
    // }, []);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            ratings: { ...formData.ratings, [name]: value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevents submission if already loading
        setLoading(true);
        const feedbackData = {
            feedback_id:feedbackid,
            ratings: formData.ratings
        };

        console.log('Feedback Data:', feedbackData); // Debugging line

        try {
            const response = await fetch('http://localhost:5000/api/updateFeedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData)
            });
            const data = await response.json();
            if (data.success) {
                alert("Feedback submitted successfully!");
            } else {
                alert(data.message); // Show error message if not successful
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    const ratingParameters = [
        { label: 'Subject Knowledge', name: 'avg_subject_knowledge' },
        { label: 'Communication Skills - Effectiveness', name: 'avg_communication_effectiveness' },
        { label: 'Communication Skills - Clarity', name: 'avg_communication_clarity' },
        { label: 'Engagement in Learning', name: 'avg_engagement' },
        { label: 'Encouragement of Class Participation', name: 'avg_participation' },
        { label: 'Responsiveness to Questions - Approachability', name: 'avg_responsiveness_approachability' },
        { label: 'Responsiveness to Questions - Effectiveness', name: 'avg_responsiveness_effectiveness' },
        { label: 'Punctuality', name: 'avg_punctuality' },
        { label: 'Preparedness', name: 'avg_preparedness' },
        { label: 'Encouragement of Critical Thinking', name: 'avg_critical_thinking' }
    ];

    return (
        <>
        {Date.now() > expirytime ? <p> Expired link</p>:
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 text-center">Teacher Evaluation Form</h3>

        <h2>Welcome, {name}</h2>
        <p>We are taking the feedback for {subject} subject and {teacher} teacher</p>
        <p><strong>Feedbackid:</strong> {feedbackid}</p>
        {/* <p><strong>Subject:</strong> {subject}</p>
       <p><strong>Teacher Name:</strong> {teacher}</p> */}

            {/* Rating Parameters */}
            {ratingParameters.map((param, index) => (
                <div key={index} className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">{param.label}:</label>
                    <select
                        name={param.name}
                        value={formData.ratings[param.name]}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select a rating</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Submit Feedback
            </button>
        </form>}
        </>
    );
}

export default FeedbackForm;
