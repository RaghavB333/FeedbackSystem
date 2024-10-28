import React, { useState, useEffect } from 'react';

function FeedbackForm() {
    const [formData, setFormData] = useState({
        student_id: '',
        teacher_id: '',
        ratings: {
            subject_knowledge: '',
            communication_effectiveness: '',
            communication_clarity: '',
            engagement: '',
            participation: '',
            responsiveness_approachability: '',
            responsiveness_effectiveness: '',
            punctuality: '',
            preparedness: '',
            critical_thinking: ''
        }
    });
    const [teacherOptions, setTeacherOptions] = useState([]);

    // Fetch the student ID and teacher list on mount
    useEffect(() => {
        // Fetch student ID
        fetch('/api/getStudentId')
            .then(response => response.json())
            .then(data => setFormData(prev => ({ ...prev, student_id: data.student_id })))
            .catch(error => console.error("Error fetching student ID:", error));

        // Fetch teacher options
        fetch('/api/getTeachers')
            .then(response => response.json())
            .then(data => setTeacherOptions(data))
            .catch(error => console.error("Error fetching teachers:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'teacher_id') {
            setFormData({ ...formData, teacher_id: value });
        } else {
            setFormData({
                ...formData,
                ratings: { ...formData.ratings, [name]: value }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const feedbackData = {
            student_id: formData.student_id,
            teacher_id: formData.teacher_id,
            ratings: formData.ratings
        };

        try {
            const response = await fetch('/api/submitFeedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData)
            });
            const data = await response.json();
            if (data.success) alert("Feedback submitted successfully!");
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 text-center">Teacher Evaluation Form</h3>

            {/* Teacher Selection */}
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">Select Teacher:</label>
                <select
                    name="teacher_id"
                    value={formData.teacher_id}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                >
                    <option value="">Choose a teacher</option>
                    {teacherOptions.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                    <option value="t1">Dr.Smith</option>
                </select>
            </div>

            {/* Rating Parameters */}
            {[
                { label: 'Subject Knowledge', name: 'subject_knowledge' },
                { label: 'Communication Skills - Effectiveness', name: 'communication_effectiveness' },
                { label: 'Communication Skills - Clarity', name: 'communication_clarity' },
                { label: 'Engagement in Learning', name: 'engagement' },
                { label: 'Encouragement of Class Participation', name: 'participation' },
                { label: 'Responsiveness to Questions - Approachability', name: 'responsiveness_approachability' },
                { label: 'Responsiveness to Questions - Effectiveness', name: 'responsiveness_effectiveness' },
                { label: 'Punctuality', name: 'punctuality' },
                { label: 'Preparedness', name: 'preparedness' },
                { label: 'Encouragement of Critical Thinking', name: 'critical_thinking' }
            ].map((param, index) => (
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
        </form>
    );
}

export default FeedbackForm;
