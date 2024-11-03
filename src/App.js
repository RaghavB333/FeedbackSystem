import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import SetPassword from './components/SetPassword';
import FeedbackForm from './components/FeedbackForm';
import Admin_login from './components/Admin_login';
import Feedback_selection from './components/Feedback_selection';
import Feedback_taken from './components/Feedback_taken';
import Login from './components/login';
import Admin_home from './components/Admin_home';
import Display_result from './components/Display_result';
import axios from 'axios';
import EvaluationPage from './components/Evaluation';
import Stu_pass_change from './components/Stu_pass_change';
import Management from './components/Management';

function App() {
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentData, setStudentData] = useState(null); 
    const [referrer, setReferrer] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('/api/checkLogin', { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json(); // Fetch student data on login
                    setIsLoggedIn(true);
                    setStudentData(data); // Set student data in state
                }
            } catch (error) {
                console.error("Error checking login status:", error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogin = (data) => {
        setIsLoggedIn(true);
        setStudentData(data);
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST', credentials: 'include' });
            setIsLoggedIn(false);
            setStudentData(null);
            setReferrer(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleUpdate = async (updatedData) => {
        try {
            await axios.post('http://localhost:5000/updateStudent', updatedData);
            setStudentData(updatedData); // Update local state with updated data
        } catch (error) {
            console.error("Error updating student data:", error);
            throw new Error('Failed to update student data'); // Provide error feedback to Dashboard
        }
    };

    const ProtectedRoute = ({ element, referrerName }) => {
        if (isLoggedIn) return element;

        if (!referrer) setReferrer(referrerName);
        return <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/login" 
                    element={
                        <Login 
                            onLogin={handleLogin} 
                            referrer={referrer} 
                            clearReferrer={() => setReferrer(null)} 
                        />
                    } 
                />
                <Route path="/registration" element={<Registration />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute 
                            element={<Dashboard onLogout={handleLogout} studentData={studentData} onUpdate={handleUpdate} />} 
                            referrerName="dashboard" 
                        />
                    } 
                />
                <Route path="/setPassword" element={<SetPassword />} /> 
                <Route path="/admin-login" element={<Admin_login />} /> 
                <Route path="/feedbackselection" element={<Feedback_selection />} /> 
                <Route path="/feedbacktaken" element={<Feedback_taken />} /> 
                <Route path="/admin-home" element={<Admin_home />} /> 
                <Route path="/teachers-result" element={<Display_result />} /> 
                <Route path="/evaluation" element={<EvaluationPage />} /> 
                <Route path="/stu-pass-change" element={<Stu_pass_change />} /> 
                <Route path="/management" element={<Management />} /> 
                <Route path="/feedbackForm" element={<FeedbackForm />} /> 

                {/* <Route 
                    path="/feedbackForm" 
                    element={
                        <ProtectedRoute 
                            element={<FeedbackForm teacherOptions={teacherOptions} />} 
                            referrerName="feedbackForm" 
                        />
                    } 
                />  */}
            </Routes>
        </Router>
    );
}

export default App;
