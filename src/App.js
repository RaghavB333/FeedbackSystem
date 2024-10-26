// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import Home from './components/Home';
import Registration from './components/Registration';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </Router>
    );
}

export default App;
