import React from 'react';
import {useNavigate } from 'react-router-dom';

const Admin_home = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Admin_home