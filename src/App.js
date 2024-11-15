import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
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
import ForgotPassword from './components/ForgotPassword';
import Management from './components/Management';
import axios from 'axios'; // Add this line to import axios
import ResultSelection from './components/Result_Selection';
import OverallPerformancePage from './components/Overall_Performance_Page';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentData, setStudentData] = useState(null);

    // Handle student login and set student data
    const handleLogin = (data) => {
        setIsLoggedIn(true);
        setStudentData(data);
    };

    // Handle student logout
    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST', credentials: 'include' });
            setIsLoggedIn(false);
            setStudentData(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Handle student data updates
    const handleUpdate = async (updatedData) => {
        try {
            await axios.post('http://localhost:5000/updateStudent', updatedData);
            setStudentData(updatedData);
        } catch (error) {
            console.error("Error updating student data:", error);
            throw new Error('Failed to update student data');
        }
    };

    // Protect student-only routes
    const ProtectedRoute = ({ element }) => {
        if (isLoggedIn) return element;
        return <Navigate to="/login" replace />;
    };

    // Protect admin-only routes
    const AdminProtectedRoute = ({ element }) => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check isAdmin from localStorage
        if (isAdmin) return element;
        return <Navigate to="/admin-login" replace />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Student Login */}
                <Route
                    path="/login"
                    element={!studentData ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
                />

                {/* Student Registration */}
                <Route path="/registration" element={<Registration />} />

                {/* Student Dashboard */}
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute element={<Dashboard onLogout={handleLogout} studentData={studentData} onUpdate={handleUpdate} />} />}
                />

                {/* Password Setup */}
                <Route path="/setPassword" element={<SetPassword />} />

                {/* Admin Routes */}
                <Route path="/admin-login" element={<Admin_login />} />
                <Route path="/admin-home" element={<AdminProtectedRoute element={<Admin_home />} />} />
                <Route path="/feedbackselection" element={<AdminProtectedRoute element={<Feedback_selection />} />} />
                <Route path="/feedbacktaken" element={<AdminProtectedRoute element={<Feedback_taken onUpdate={handleUpdate} />} />} />
                <Route path="/teachers-result" element={<AdminProtectedRoute element={<Display_result />} />} />
                <Route path="/evaluation" element={<AdminProtectedRoute element={<EvaluationPage />} />} />
                <Route path="/management" element={<AdminProtectedRoute element={<Management />} />} />

                {/* Forgot Password */}
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Feedback Form */}
                <Route path="/feedbackForm" element={<FeedbackForm />} />

                {/* Result Selection */}
                <Route path="/result-selection" element={<AdminProtectedRoute element={<ResultSelection />} />} />

                {/* Overall Performance Page */}
                <Route path="/overall-performance" element={<AdminProtectedRoute element={<OverallPerformancePage />} />} />
            </Routes>
        </Router>
    );
};

export default App;
