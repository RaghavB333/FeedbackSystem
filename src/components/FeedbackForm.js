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
            avg_syllabus_coverage: '',
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
        1: { 
            label: 'Poor', 
            description: 'Significant improvement needed', 
            punjabi: 'ਮਹੱਤਵਪੂਰਨ ਸੁਧਾਰ ਦੀ ਲੋੜ ਹੈ।' 
        },
        2: { 
            label: 'Below Average', 
            description: 'Some improvement required', 
            punjabi: 'ਕੁਝ ਸੁਧਾਰ ਦੀ ਲੋੜ ਹੈ।' 
        },
        3: { 
            label: 'Satisfactory', 
            description: 'Meets basic expectations', 
            punjabi: 'ਮੁੱਢਲੀ ਉਮੀਦਾਂ ਨੂੰ ਪੂਰਾ ਕਰਦਾ ਹੈ।' 
        },
        4: { 
            label: 'Good', 
            description: 'Exceeds expectations', 
            punjabi: 'ਉਮੀਦਾਂ ਤੋਂ ਵਧੀਆ ਪ੍ਰਦਰਸ਼ਨ।' 
        },
        5: { 
            label: 'Excellent', 
            description: 'Outstanding performance', 
            punjabi: 'ਸ਼ਾਨਦਾਰ ਪ੍ਰਦਰਸ਼ਨ।' 
        }
    };

    useEffect(() => {
        const checkSubmission = async () => {
            try {
                const response = await fetch(`https://feedbacksystem-backend-8kxj.onrender.com/api/checkFeedbackSubmission?token=${token}`);
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
            const response = await fetch(`https://feedbacksystem-backend-8kxj.onrender.com/api/updateFeedback?token=${token}`, {
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
        { label: 'Subject Knowledge', name: 'avg_subject_knowledge', description: 'Understanding and expertise in the subject matter', punjabi: 'ਵਿਸ਼ੇ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ ਕੁਸ਼ਲਤਾ' },
        { label: 'Syllabus Coverage', name: 'avg_syllabus_coverage', description: 'Coverage of course syllabus', punjabi: 'ਕੋਰਸ ਦੇ ਸਿਲੇਬਸ ਦੀ ਕਵਰੇਜ' },
        { label: 'Communication Skills - Effectiveness', name: 'avg_communication_effectiveness', description: 'Ability to convey ideas effectively', punjabi: 'ਵਿਚਾਰਾਂ ਨੂੰ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਢੰਗ ਨਾਲ ਪੇਸ਼ ਕਰਨ ਦੀ ਯੋਗਤਾ' },
        { label: 'Communication Skills - Clarity', name: 'avg_communication_clarity', description: 'Clarity and coherence in explanation', punjabi: 'ਵਿਆਖਿਆ ਵਿੱਚ ਸਪਸ਼ਟਤਾ' },
        { label: 'Engagement in Learning', name: 'avg_engagement', description: 'Creating an engaging learning environment', punjabi: 'ਰੁਚਿਕਰ ਪਾਠ ਸਥਿਤੀ ਦਾ ਨਿਰਮਾਣ' },
        { label: 'Encouragement of Class Participation', name: 'avg_participation', description: 'Promoting student involvement', punjabi: 'ਵਿਦਿਆਰਥੀ ਹਿੱਸੇਦਾਰੀ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ' },
        { label: 'Responsiveness - Approachability', name: 'avg_responsiveness_approachability', description: 'Openness to student queries', punjabi: 'ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਪ੍ਰਸ਼ਨਾਂ ਲਈ ਖੁਲ੍ਹੇ ਦਿਲ ਦੇ ਹੋਣਾ' },
        { label: 'Responsiveness - Effectiveness', name: 'avg_responsiveness_effectiveness', description: 'Quality of responses to questions', punjabi: 'ਪ੍ਰਸ਼ਨਾਂ ਦੇ ਉੱਤਰਾਂ ਦੀ ਗੁਣਵੱਤਾ' },
        { label: 'Punctuality', name: 'avg_punctuality', description: 'Timeliness and attendance', punjabi: 'ਸਮੇਂ ਦੀ ਪਾਬੰਦੀ ਅਤੇ ਹਾਜ਼ਰੀ' },
        { label: 'Preparedness', name: 'avg_preparedness', description: 'Organization and readiness for class', punjabi: 'ਕਲਾਸ ਲਈ ਤਿਆਰੀ' },
        { label: 'Critical Thinking Encouragement', name: 'avg_critical_thinking', description: 'Promoting analytical thinking', punjabi: 'ਅਲੋਚਨਾਤਮਕ ਸੋਚ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ' }
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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10 px-4">
            {isVerificationOpen && <VerificationModal />}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
                <header className="p-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-t-lg">
                    <h1 className="text-4xl font-bold mb-2">Teacher Evaluation Form</h1>
                    <p>Welcome, <span className="font-semibold">{name}</span></p>
                    <p>Feedback for <span className="font-semibold">{subject}</span> taught by {teacher}</p>
                </header>

                <div className="p-8">
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h4 className="text-lg font-semibold mb-3">Rating Guide</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {Object.entries(ratingDescriptions).map(([rating, { label, description, punjabi }]) => (
                                <div key={rating} className="p-2 rounded border shadow-sm bg-white">
                                    <div className="font-medium text-sm">{rating} - {label}</div>
                                    <div className="text-xs text-gray-600">{description}</div>
                                    <div className="text-xs text-gray-500">{punjabi}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {ratingParameters.map((param, index) => (
                            <div key={index} className="p-4 bg-blue-50 rounded-lg border">
                                <label className="block text-gray-800 font-medium mb-1">
                                    {param.label} <span className="text-sm text-gray-500">({param.description})</span>
                                </label>
                                <span className="text-sm text-gray-600">{param.punjabi}</span>
                                <select
                                    name={param.name}
                                    value={formData.ratings[param.name]}
                                    onChange={handleChange}
                                    className="mt-2 w-full border bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Select Rating</option>
                                    {Object.keys(ratingDescriptions).map((rating) => (
                                        <option key={rating} value={rating}>{rating}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:bg-indigo-300"
                            >
                                {loading ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FeedbackForm;
    