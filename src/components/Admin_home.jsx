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
    <div style={styles.container}>
      <div style={styles.card} onClick={() => navigate('/management')}>
        Management
      </div>
      <div style={styles.card} onClick={() => navigate('/teachers-result')}>
        View Result
      </div>
      <div style={styles.card} onClick={() => navigate('/feedbackselection')}>
        Take Feedback
      </div>
      <div style={styles.card} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Admin_home;
