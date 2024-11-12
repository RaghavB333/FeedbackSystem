import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
    
    const [message,setmassge] = useState('');
    const [isFocused, setIsFocused] = useState({ username: false, password: false });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminCredentials),
            credentials: 'include',
        });

        if (response.ok) {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin-home');
        } else {
            setmassge("Invalid Credentials");
            console.error('Admin login failed');
        }
    };

    const handleFocus = (inputName) => {
        setIsFocused((prev) => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        setIsFocused((prev) => ({ ...prev, [inputName]: false }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Login
              </h1>
              <p className="text-gray-600">
                Enter your credentials to access the admin panel
              </p>
            </div>
  
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="username"
                  value={adminCredentials.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="password"
                  value={adminCredentials.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign In
              </button>
              <p className='text-red-500 text-center'>{message && message}</p>
            </form>
          </div>
      </div>
      </div>
    );
};

export default AdminLogin;
