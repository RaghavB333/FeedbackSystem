import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import SetPassword from './components/SetPassword';
import FeedbackForm from './components/FeedbackForm';
import Login from './components/login';
import axios from 'axios';

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
                <Route 
                    path="/feedbackForm" 
                    element={
                        <ProtectedRoute 
                            element={<FeedbackForm teacherOptions={teacherOptions} />} 
                            referrerName="feedbackForm" 
                        />
                    } 
                /> 
            </Routes>
        </Router>
    );
}

export default App;
