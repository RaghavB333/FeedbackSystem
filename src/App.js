// App.js
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
import EvaluationPage from './components/Evaluation';
import ForgetPassword from './components/ForgetPassword';
import Management from './components/Management';
import axios from 'axios'; // Add this line to import axios


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentData, setStudentData] = useState(null);

    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const response = await fetch('/api/checkLogin', { credentials: 'include' });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setIsLoggedIn(true);
    //                 setStudentData(data);
    //             }
    //         } catch (error) {
    //             console.error("Error checking login status:", error);
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);

    const handleLogin = (data) => {
        setIsLoggedIn(true);
        setStudentData(data);
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST', credentials: 'include' });
            setIsLoggedIn(false);
            setStudentData(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleUpdate = async (updatedData) => {
        try {
            await axios.post('http://localhost:5000/updateStudent', updatedData);
            setStudentData(updatedData);
        } catch (error) {
            console.error("Error updating student data:", error);
            throw new Error('Failed to update student data');
        }
    };

    const ProtectedRoute = ({ element }) => {
        if (isLoggedIn) return element;
        return <Navigate to="/login" replace />;
    };

    const AdminProtectedRoute = ({ element }) => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check isAdmin from localStorage
        if (isAdmin) return element;
        return <Navigate to="/admin-login" replace />;
    };
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard onLogout={handleLogout} studentData={studentData} onUpdate={handleUpdate} />} />} />
                <Route path="/setPassword" element={<SetPassword />} />
                <Route path="/admin-login" element={<Admin_login />} />
                <Route path="/admin-home" element={<AdminProtectedRoute element={<Admin_home />} />} />
                <Route path="/feedbackselection" element={<Feedback_selection />} />
                <Route path="/feedbacktaken" element={<Feedback_taken onUpdate={handleUpdate}/>} />
                <Route path="/teachers-result" element={<Display_result />} />
                <Route path="/evaluation" element={<EvaluationPage />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/management" element={<Management />} />
                <Route path="/feedbackForm" element={<FeedbackForm />} />
            </Routes>
        </Router>
    );
}    

export default App;
