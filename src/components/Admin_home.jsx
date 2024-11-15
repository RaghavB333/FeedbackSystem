import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin_home = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    window.addEventListener('storage', checkAdminStatus);
    return () => window.removeEventListener('storage', checkAdminStatus);
  }, []);


  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login'); // Redirect to login page if not authorized
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin'); // Remove admin status from localStorage
    setIsAdmin(false); // Update state
    navigate('/admin-login'); // Immediately redirect to admin login page
  };



  // Styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    card: {
      width: '150px',
      height: '100px',
      margin: '20px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      textAlign: 'center',
    },
  };

  return (
    // <div style={styles.container}>
    //   <div style={styles.card} onClick={() => navigate('/management')}>
    //     Management
    //   </div>
    //   <div style={styles.card} onClick={() => navigate('/teachers-result')}>
    //     View Result
    //   </div>
    //   <div style={styles.card} onClick={() => navigate('/feedbackselection')}>
    //     Take Feedback
    //   </div>
    //   <div style={styles.card} onClick={handleLogout}>
    //     Logout
    //   </div>
    // </div>


    <div className="container mx-auto bg-gray-50 py-2 h-[100vh]">
      <div className='flex items-center gap-2 ms-3 text-[1.2rem]'>
        <img src="https://ptu.ac.in/wp-content/themes/cynic/images/classic-logo.png" alt="" width={80} height={80} />
        <div>
          <h2 className='text-blue-800 font-bold'>ਆਈ. ਕੇ. ਗੁਜਰਾਲ ਪੰਜਾਬ ਟੈਕਨੀਕਲ ਯੂਨੀਵਰਸਿਟੀ, ਜਲੰਧਰ</h2>
          <h2 className='text-red-600 font-bold'>I.K. GUJRAL PUNJAB TECHNICAL UNIVERSITY, JALANDHAR</h2>
        </div>
      </div>
      <hr className='mt-1'/>
    <h1 className="text-4xl font-bold ms-4 mt-6 text-blue-600">Welcome, Admin</h1>
    <div className="mt-6 grid grid-cols-2 md:grid-cols-2 gap-6 gap-y-20">
      <div
        className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => navigate('/management')}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-blue-600">Management</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <p className="text-gray-500">Manage users, roles, and permissions.</p>
      </div>
      <div
        className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => navigate('/result-selection')}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-blue-600">View Result</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500">View and analyze teacher performance data.</p>
      </div>
      <div
        className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => navigate('/feedbackselection')}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-blue-600">Take Feedback</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-gray-500">Provide feedback and ratings for teachers.</p>
      </div>
      <div
        className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-red-50 transition-colors"
        onClick={handleLogout}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-red-600">Logout</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        <p className="text-gray-500">Sign out of the admin portal.</p>
      </div>
    </div>
  </div>

  );
};

export default Admin_home;
