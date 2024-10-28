// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import SetPassword from './components/SetPassword'; 
import FeedbackForm from './components/FeedbackForm';

function App() {
    const [teacherOptions, setTeacherOptions] = useState([]);

    useEffect(() => {
        // Fetch teachers data
        const fetchTeachers = async () => {
            try {
                const response = await fetch('/api/teachers');
                const data = await response.json();
                setTeacherOptions(data);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };
        
        fetchTeachers();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/setPassword" element={<SetPassword />} /> 
                <Route path='/feedbackForm' element={<FeedbackForm teacherOptions={teacherOptions} />} /> 
            </Routes>
        </Router>
    );
}

export default App;
