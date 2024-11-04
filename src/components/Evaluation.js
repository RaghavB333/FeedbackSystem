import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import EvaluationChart from './EvaluationChart';

const EvaluationPage = () => {
    const [evaluationData, setEvaluationData] = useState(null);
    const [evaluationSummary, setEvaluationSummary] = useState(null);

    const location = useLocation();
    const { feedback_id,teacherid,subject,teacher_name } = location.state || {};

   
   
    

    useEffect(() => {
        const fetchEvaluationData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/fetchFeedback', { feedback_id: feedback_id });

                if (response.data) {
                    const data = response.data;

                    const weights = {
                        avg_subject_knowledge: 0.2,
                        avg_communication_effectiveness: 0.15,
                        avg_communication_clarity: 0.15,
                        avg_engagement: 0.1,
                        avg_participation: 0.1,
                        avg_responsiveness_approachability: 0.1,
                        avg_responsiveness_effectiveness: 0.1,
                        avg_punctuality: 0.05,
                        avg_preparedness: 0.05,
                        avg_critical_thinking: 0.05
                    };
                    
                    const totalScore = (
                        (Number(data.avg_subject_knowledge) * weights.avg_subject_knowledge || 0) +
                        (Number(data.avg_communication_effectiveness) * weights.avg_communication_effectiveness || 0) +
                        (Number(data.avg_communication_clarity) * weights.avg_communication_clarity || 0) +
                        (Number(data.avg_engagement) * weights.avg_engagement || 0) +
                        (Number(data.avg_participation) * weights.avg_participation || 0) +
                        (Number(data.avg_responsiveness_approachability) * weights.avg_responsiveness_approachability || 0) +
                        (Number(data.avg_responsiveness_effectiveness) * weights.avg_responsiveness_effectiveness || 0) +
                        (Number(data.avg_punctuality) * weights.avg_punctuality || 0) +
                        (Number(data.avg_preparedness) * weights.avg_preparedness || 0) +
                        (Number(data.avg_critical_thinking) * weights.avg_critical_thinking || 0)
                    ).toFixed(1);
                    
                    

                    setEvaluationData({
                        teacherID: teacherid, 
                        teacherName: teacher_name, 
                        subjectName: subject, 
                        evaluationDate: data.last_updated,
                        totalScore: totalScore,
                        ratings: {
                            subject_knowledge: data.avg_subject_knowledge,
                            communication_effectiveness: data.avg_communication_effectiveness,
                            communication_clarity: data.avg_communication_clarity,
                            engagement_in_learning: data.avg_engagement,
                            encouragement_of_class_participation: data.avg_participation,
                            responsiveness_to_questions_approachability: data.avg_responsiveness_approachability,
                            responsiveness_to_questions_effectiveness: data.avg_responsiveness_effectiveness,
                            punctuality: data.avg_punctuality,
                            preparedness: data.avg_preparedness,
                            encouragement_of_critical_thinking: data.avg_critical_thinking,
                        },
                    });

                    // Dynamic Summary Generation
                    const generateSummary = (score) => {
                        if (score >= 4.5) {
                            return {
                                overallPerformance: "Excellent",
                                summary: "The teacher demonstrates exceptional performance, excelling in all evaluated areas.",
                                suggestions: "Continue to leverage strengths, engage in professional development, and mentor peers."
                            };
                        } else if (score >= 4.0) {
                            return {
                                overallPerformance: "Very Good",
                                summary: "The teacher shows very good performance with minor areas for improvement.",
                                suggestions: "Consider exploring new teaching strategies and seeking feedback from colleagues."
                            };
                        } else if (score >= 3.5) {
                            return {
                                overallPerformance: "Good",
                                summary: "The teacher performs well but should focus on enhancing engagement and clarity.",
                                suggestions: "Attend workshops on communication techniques and student engagement."
                            };
                        } else if (score >= 3.0) {
                            return {
                                overallPerformance: "Satisfactory",
                                summary: "The teacher's performance is satisfactory, with notable room for improvement.",
                                suggestions: "Work on specific areas such as classroom management and responsiveness to student inquiries."
                            };
                        } else if (score >= 2.5) {
                            return {
                                overallPerformance: "Needs Improvement",
                                summary: "The teacher needs improvement in several key areas impacting student learning.",
                                suggestions: "Engage in professional development, focus on lesson preparation, and seek mentorship."
                            };
                        } else {
                            return {
                                overallPerformance: "Unsatisfactory",
                                summary: "The teacher's performance is unsatisfactory, significantly affecting student experience.",
                                suggestions: "Consider a comprehensive review of teaching strategies and possibly seeking support from educational mentors."
                            };
                        }
                    };

                    const summaryData = generateSummary(totalScore);
                    setEvaluationSummary(summaryData);
                }
            } catch (error) {
                console.error("Failed to fetch evaluation data:", error);
            }
        };

        fetchEvaluationData();
    }, []);

    const getPerformanceStatement = (parameter, score) => {
        switch (parameter) {
            case 'subject_knowledge':
                if (score >= 4.5) return { statement: "Exceptional knowledge and expertise in the subject matter.", suggestion: "Continue deepening subject knowledge through ongoing education." };
                if (score >= 4.0) return { statement: "Strong understanding of the subject, with minor gaps.", suggestion: "Engage in peer discussions to enhance understanding." };
                if (score >= 3.5) return { statement: "Good knowledge of the subject but needs deeper exploration.", suggestion: "Consider additional research to enhance content delivery." };
                if (score >= 3.0) return { statement: "Satisfactory knowledge, but improvement is necessary.", suggestion: "Attend workshops related to the subject matter." };
                if (score >= 2.5) return { statement: "Limited understanding; more study is required.", suggestion: "Invest time in studying the curriculum and related resources." };
                if (score >= 2.0) return { statement: "Lacks adequate subject knowledge.", suggestion: "Consider mentorship from more experienced colleagues." };
                return { statement: "Very poor understanding of the subject matter.", suggestion: "Immediate action is needed to improve subject knowledge." };
            case 'communication_effectiveness':
                if (score >= 4.5) return { statement: "Communicates ideas clearly and effectively.", suggestion: "Continue to employ effective communication techniques." };
                if (score >= 4.0) return { statement: "Generally communicates well, with some minor issues.", suggestion: "Work on refining presentation skills." };
                if (score >= 3.5) return { statement: "Communication is mostly effective, but can be improved.", suggestion: "Seek feedback on presentation clarity." };
                if (score >= 3.0) return { statement: "Satisfactory communication, requires clarity in delivery.", suggestion: "Focus on clarity and structure in communications." };
                if (score >= 2.5) return { statement: "Often unclear, making it difficult for students to understand.", suggestion: "Consider practicing communication techniques." };
                if (score >= 2.0) return { statement: "Struggles to communicate ideas effectively.", suggestion: "Engage in communication training." };
                return { statement: "Fails to convey information appropriately.", suggestion: "Seek immediate support to improve communication skills." };
            case 'communication_clarity':
                if (score >= 4.5) return { statement: "Presents information in a very clear and concise manner.", suggestion: "Maintain high standards of clarity." };
                if (score >= 4.0) return { statement: "Information is generally clear, with occasional confusion.", suggestion: "Continue to enhance clarity in presentations." };
                if (score >= 3.5) return { statement: "Often clear, but sometimes requires clarification.", suggestion: "Engage students to verify their understanding." };
                if (score >= 3.0) return { statement: "Presents information that can be confusing at times.", suggestion: "Simplify complex concepts for better understanding." };
                if (score >= 2.5) return { statement: "Clarity is often lacking; significant improvements needed.", suggestion: "Consider using visual aids to enhance clarity." };
                if (score >= 2.0) return { statement: "Information is frequently confusing and unclear.", suggestion: "Work with colleagues to improve presentation skills." };
                return { statement: "Consistently unclear in all presentations.", suggestion: "Immediate intervention is necessary for clarity." };
            case 'engagement_in_learning':
                if (score >= 4.5) return { statement: "Actively engages students and fosters participation.", suggestion: "Continue to build on engagement strategies." };
                if (score >= 4.0) return { statement: "Usually engages students well, with some room for enhancement.", suggestion: "Explore new interactive methods." };
                if (score >= 3.5) return { statement: "Engagement is good but can be more interactive.", suggestion: "Incorporate more hands-on activities." };
                if (score >= 3.0) return { statement: "Occasionally engages students; needs improvement.", suggestion: "Utilize group discussions to enhance engagement." };
                if (score >= 2.5) return { statement: "Engagement is inconsistent; students often disengage.", suggestion: "Evaluate teaching strategies to increase engagement." };
                if (score >= 2.0) return { statement: "Rarely engages students in the learning process.", suggestion: "Consider training on engagement techniques." };
                return { statement: "Almost no effort to engage students at all.", suggestion: "Immediate action needed to enhance student involvement." };
            case 'encouragement_of_class_participation':
                if (score >= 4.5) return { statement: "Encourages and values student participation significantly.", suggestion: "Continue to promote active participation." };
                if (score >= 4.0) return { statement: "Generally promotes participation with some effective strategies.", suggestion: "Consider varied participation techniques." };
                if (score >= 3.5) return { statement: "Encourages participation but lacks consistent methods.", suggestion: "Establish clearer participation guidelines." };
                if (score >= 3.0) return { statement: "Supports participation occasionally; more effort is needed.", suggestion: "Implement regular participation opportunities." };
                if (score >= 2.5) return { statement: "Rarely encourages student participation.", suggestion: "Develop strategies to engage more students." };
                if (score >= 2.0) return { statement: "Does not encourage class participation at all.", suggestion: "Seek guidance to foster a participatory environment." };
                return { statement: "Completely dismisses student participation.", suggestion: "Urgent changes are necessary." };
            case 'responsiveness_to_questions_approachability':
                if (score >= 4.5) return { statement: "Always responsive and approachable for student inquiries.", suggestion: "Maintain excellent availability for students." };
                if (score >= 4.0) return { statement: "Generally responsive, with minor delays in approachability.", suggestion: "Keep engaging with students' concerns." };
                if (score >= 3.5) return { statement: "Usually responsive; approachability could be improved.", suggestion: "Consider regular office hours for students." };
                if (score >= 3.0) return { statement: "Satisfactory responsiveness but often unapproachable.", suggestion: "Encourage more student interaction." };
                if (score >= 2.5) return { statement: "Often unresponsive to student inquiries.", suggestion: "Improve responsiveness through timely feedback." };
                if (score >= 2.0) return { statement: "Rarely responsive to students' questions.", suggestion: "Seek to enhance approachability through open communication." };
                return { statement: "Completely unresponsive and unapproachable.", suggestion: "Serious intervention is needed." };
            case 'responsiveness_to_questions_effectiveness':
                if (score >= 4.5) return { statement: "Highly effective in addressing student questions.", suggestion: "Continue to apply effective strategies." };
                if (score >= 4.0) return { statement: "Generally effective, with minor areas for improvement.", suggestion: "Reflect on past queries for better responses." };
                if (score >= 3.5) return { statement: "Effectiveness is adequate but needs more clarity.", suggestion: "Focus on improving clarity in answers." };
                if (score >= 3.0) return { statement: "Satisfactory effectiveness in responses but lacks depth.", suggestion: "Consider enhancing responses with examples." };
                if (score >= 2.5) return { statement: "Often ineffective in addressing queries.", suggestion: "Review question handling strategies." };
                if (score >= 2.0) return { statement: "Rarely provides effective answers to questions.", suggestion: "Enhance responsiveness by practicing effective answering." };
                return { statement: "Completely ineffective in responding to questions.", suggestion: "Immediate improvement is crucial." };
            case 'punctuality':
                if (score >= 4.5) return { statement: "Always punctual, respecting scheduled time.", suggestion: "Continue to maintain excellent punctuality." };
                if (score >= 4.0) return { statement: "Generally punctual with minor delays.", suggestion: "Keep reinforcing the importance of time management." };
                if (score >= 3.5) return { statement: "Usually punctual but needs to improve time adherence.", suggestion: "Review scheduling practices." };
                if (score >= 3.0) return { statement: "Satisfactory punctuality but could enhance time respect.", suggestion: "Work on strategies for better time management." };
                if (score >= 2.5) return { statement: "Often late; improvement is needed.", suggestion: "Evaluate time management approaches." };
                if (score >= 2.0) return { statement: "Rarely punctual and fails to respect schedules.", suggestion: "Immediate changes to punctuality are required." };
                return { statement: "Consistently arrives late and fails to respect scheduled time.", suggestion: "Take urgent steps to enhance punctuality." };
            case 'preparedness':
                if (score >= 4.5) return { statement: "Always well-prepared for every class session.", suggestion: "Continue the excellent preparation approach." };
                if (score >= 4.0) return { statement: "Generally prepared, with minor lapses.", suggestion: "Review preparation methods for enhancement." };
                if (score >= 3.5) return { statement: "Usually prepared but could enhance material knowledge.", suggestion: "Consider revisiting the curriculum for better preparation." };
                if (score >= 3.0) return { statement: "Preparation is satisfactory; can improve overall readiness.", suggestion: "Increase the frequency of practice sessions." };
                if (score >= 2.5) return { statement: "Often unprepared for classes.", suggestion: "Focus on systematic preparation techniques." };
                if (score >= 2.0) return { statement: "Seldom arrives prepared for lessons.", suggestion: "Seek guidance on effective preparation strategies." };
                return { statement: "Completely unprepared and lacks necessary materials.", suggestion: "Immediate intervention is needed." };
            case 'encouragement_of_critical_thinking':
                if (score >= 4.5) return { statement: "Strongly encourages critical thinking and problem-solving.", suggestion: "Continue promoting critical thinking activities." };
                if (score >= 4.0) return { statement: "Promotes critical thinking effectively, with some gaps.", suggestion: "Explore innovative approaches to foster thinking." };
                if (score >= 3.5) return { statement: "Encourages critical thinking but can improve methods.", suggestion: "Incorporate diverse critical thinking exercises." };
                if (score >= 3.0) return { statement: "Supports critical thinking occasionally; more emphasis needed.", suggestion: "Engage students in discussions to stimulate thinking." };
                if (score >= 2.5) return { statement: "Rarely encourages critical thinking.", suggestion: "Review teaching practices to enhance critical engagement." };
                if (score >= 2.0) return { statement: "Does not promote critical thinking.", suggestion: "Seek training on teaching critical thinking skills." };
                return { statement: "Completely discourages any form of critical thought.", suggestion: "Urgent changes are needed." };
            default:
                return { statement: "No performance statement available.", suggestion: "Consult the evaluation framework for guidance." };
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
            {evaluationData ? (
                <>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Teacher Evaluation Report</h1>
                    <div className="text-center mb-6">
                        {/* <p className="text-lg font-semibold text-gray-700">Evaluator: <span className="font-normal">{evaluationData.evaluatorName}</span></p> */}
                        <p className="text-lg font-semibold text-gray-700">Teacher ID: <span className="font-normal">{evaluationData.teacherID}</span></p>
                        <p className="text-lg font-semibold text-gray-700">TeacherName: <span className="font-normal">{evaluationData.teacherName}</span></p>
                        <p className="text-lg font-semibold text-gray-700">Subject: <span className="font-normal">{evaluationData.subjectName}</span></p>
                        <p className="text-lg font-semibold text-gray-700">Date: <span className="font-normal">{evaluationData.evaluationDate}</span></p>
                    </div>
                   
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Score: <span className="text-green-600">{evaluationData.totalScore}</span></h2>
                    {evaluationSummary && (
                        <div className="bg-gray-100 border-l-4 border-green-500 p-4 rounded-lg mb-6 shadow-inner">
                            <p className="font-semibold text-gray-800">Overall Performance: <span className="font-normal">{evaluationSummary.overallPerformance}</span></p>
                            <p className="text-gray-700">{evaluationSummary.summary}</p>
                            <p className="mt-2"><span className="font-semibold">Suggestions: </span>{evaluationSummary.suggestions}</p>
                        </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Detailed Performance Statements:</h3>
                    <ul className="list-disc list-inside mb-6">
                        {Object.keys(evaluationData.ratings).map((parameter) => {
                            const score = evaluationData.ratings[parameter];
                            const { statement, suggestion } = getPerformanceStatement(parameter, score);
                            return (
                                <li key={parameter} className="mb-4 text-gray-700">
                                    <strong className="text-gray-800">{parameter.replace(/_/g, ' ')}:</strong> {statement} <br />
                                    <span className="italic text-gray-600">Suggestion: {suggestion}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="chart-container mt-5">
                        <EvaluationChart ratings={evaluationData.ratings} />
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">Loading evaluation data...</p>
            )}
        </div>
    );
    
};

export default EvaluationPage;
