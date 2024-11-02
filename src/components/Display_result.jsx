// App.js
import React from 'react';

const Display_result = () => {
  // Inline styles
  const styles = {
    app: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    teacherCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '300px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
    },
    header: {
      margin: 0,
      color: '#333',
    },
    subheader: {
      marginTop: '5px',
      color: '#666',
    },
    parameters: {
      marginTop: '10px',
    },
    parameter: {
      marginBottom: '8px',
    },
  };

  // Teacher data for display
  const teacherData = {
    teacherId: "T001",
    teacherName: "John Doe",
    parameters: [
      { name: "Subject", value: "Mathematics" },
      { name: "Experience", value: "10 years" },
      { name: "Qualification", value: "M.Sc. in Mathematics" },
      { name: "Age", value: "45" },
      { name: "Contact", value: "123-456-7890" },
      { name: "Email", value: "john.doe@example.com" },
      { name: "Branch", value: "Science" },
      { name: "Semester", value: "1st" },
      { name: "Office Hours", value: "10 AM - 4 PM" },
      { name: "Room No.", value: "A102" }
    ]
  };

  return (
    <div style={styles.app}>
      <div style={styles.teacherCard}>
        <h2 style={styles.header}>Teacher ID: {teacherData.teacherId}</h2>
        <h3 style={styles.subheader}>Name: {teacherData.teacherName}</h3>
        <div style={styles.parameters}>
          {teacherData.parameters.map((param, index) => (
            <div key={index} style={styles.parameter}>
              <strong>{param.name}:</strong> {param.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Display_result;
