import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationModal from './StudentVerificationModal';

function FeedbackForm() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const feedbackid = queryParams.get('feedbackid');
    const name = queryParams.get('name');
    const subject = queryParams.get('subject');
    const teacher = queryParams.get('teacher');
    const expirytime = queryParams.get('expiryTime');
    const token = queryParams.get('token');

    const [formData, setFormData] = useState({
        teacher_id: 1,
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
        }
    });

    const [loading, setLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(null);
    const [isVerificationOpen, setIsVerificationOpen] = useState(true); // Modal is open initially

    useEffect(() => {
        const checkSubmission = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/checkFeedbackSubmission?token=${token}`);
                const data = await response.json();
                setHasSubmitted(!data.submitted); // Set to `false` if token is valid and not used
            } catch (error) {
                console.error("Error checking feedback submission:", error);
            }
        };
        checkSubmission();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            ratings: { ...formData.ratings, [name]: value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading || hasSubmitted) return;
        setLoading(true);

        const feedbackData = {
            feedback_id: feedbackid,
            ratings: formData.ratings
        };

        try {
            const response = await fetch(`http://localhost:5000/api/updateFeedback?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData)
            });
            const data = await response.json();
            if (data.success) {
                alert("Feedback submitted successfully!");
                setHasSubmitted(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setLoading(false);
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
            {Date.now() > expirytime ? (
                <p>Expired link</p>
            ) : hasSubmitted ? (
                <p>Feedback has already been submitted.</p>
            ) : (
                <>
                    {isVerificationOpen && <VerificationModal />} {/* Show the modal before feedback form */}

                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800 text-center">Teacher Evaluation Form</h3>
                        <h2>Welcome, {name}</h2>
                        <p>We are taking feedback for {subject} subject and {teacher} teacher</p>
                        <p><strong>Feedback ID:</strong> {feedbackid}</p>

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
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </form>
                </>
            )}
        </>
    );
}

export default FeedbackForm;
