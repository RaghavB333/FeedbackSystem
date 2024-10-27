// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import Home from './components/Home';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}

            </Routes>
        </Router>
    );
}

export default App;
