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
    const weightage = queryParams.get('weightage');

    console.log(weightage);

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
    const [isVerificationOpen, setIsVerificationOpen] = useState(true);

    const ratingDescriptions = {
        1: { label: 'Poor', description: 'Significant improvement needed' },
        2: { label: 'Below Average', description: 'Some improvement required' },
        3: { label: 'Satisfactory', description: 'Meets basic expectations' },
        4: { label: 'Good', description: 'Exceeds expectations' },
        5: { label: 'Excellent', description: 'Outstanding performance' }
    };

    useEffect(() => {
        const checkSubmission = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/checkFeedbackSubmission?token=${token}`);
                const data = await response.json();
                setHasSubmitted(!data.submitted);
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
            ratings: formData.ratings,
            weightage:weightage
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
        { label: 'Subject Knowledge', name: 'avg_subject_knowledge', description: 'Understanding and expertise in the subject matter' },
        { label: 'Communication Skills - Effectiveness', name: 'avg_communication_effectiveness', description: 'Ability to convey ideas effectively' },
        { label: 'Communication Skills - Clarity', name: 'avg_communication_clarity', description: 'Clarity and coherence in explanation' },
        { label: 'Engagement in Learning', name: 'avg_engagement', description: 'Creating an engaging learning environment' },
        { label: 'Encouragement of Class Participation', name: 'avg_participation', description: 'Promoting student involvement' },
        { label: 'Responsiveness to Questions - Approachability', name: 'avg_responsiveness_approachability', description: 'Openness to student queries' },
        { label: 'Responsiveness to Questions - Effectiveness', name: 'avg_responsiveness_effectiveness', description: 'Quality of responses to questions' },
        { label: 'Punctuality', name: 'avg_punctuality', description: 'Timeliness and attendance' },
        { label: 'Preparedness', name: 'avg_preparedness', description: 'Organization and readiness for class' },
        { label: 'Encouragement of Critical Thinking', name: 'avg_critical_thinking', description: 'Promoting analytical and deeper understanding' }
    ];

    if (Date.now() > expirytime) {
        return (
            <div className="max-w-xl mx-auto mt-8 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>This feedback link has expired.</p>
            </div>
        );
    }

    if (hasSubmitted) {
        return (
            <div className="max-w-xl mx-auto mt-8 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p>Feedback has already been submitted.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {isVerificationOpen && <VerificationModal />}
            
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Evaluation Form</h1>
                        <p className="text-lg text-gray-600">Welcome, {name}</p>
                        <p className="text-gray-600">Providing feedback for {subject} taught by {teacher}</p>
                        <p className="text-sm text-gray-500 mt-1">Feedback ID: {feedbackid}</p>
                    </div>

                    {/* Rating Guide */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h4 className="text-lg font-semibold mb-3">Rating Guide</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                            {Object.entries(ratingDescriptions).map(([rating, { label, description }]) => (
                                <div key={rating} className="p-2 rounded border bg-white">
                                    <div className="font-medium text-sm">{rating} - {label}</div>
                                    <div className="text-xs text-gray-600">{description}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {ratingParameters.map((param, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                                <div className="flex flex-col space-y-2">
                                    <label className="text-gray-800 font-medium">
                                        {param.label}
                                        <span className="text-sm text-gray-500 font-normal ml-2">
                                            ({param.description})
                                        </span>
                                    </label>
                                    <select
                                        name={param.name}
                                        value={formData.ratings[param.name]}
                                        onChange={handleChange}
                                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        required
                                    >
                                        <option value="">Select a rating</option>
                                        {Object.entries(ratingDescriptions).map(([value, { label }]) => (
                                            <option key={value} value={value}>
                                                {value} - {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                'Submit Feedback'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FeedbackForm;