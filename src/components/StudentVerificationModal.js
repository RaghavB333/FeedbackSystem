// VerificationModal.js
import React, { useState } from 'react';

function VerificationModal() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(true); // Boolean instead of string

    const handleVerification = () => {
        fetch('/api/verify-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setIsOpen(false); // Close the modal on success
                // Proceed with feedback form
            } else {
                alert("Verification failed. Please try again.");
            }
        })
        .catch((error) => console.error('Error:', error));
    };

    // Render the modal only if isOpen is true
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Student Verification</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                />
                <button onClick={handleVerification} className="bg-blue-500 text-white p-2 rounded">Verify</button>
                
            </div>
        </div>
    );
}

export default VerificationModal;
