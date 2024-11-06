// App.js
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 


const Display_result = () => {

  const [feedbacks, setfeedbacks] = useState([]);
  const navigate = useNavigate();

     // Get admin status from context


     const [isAdmin, setIsAdmin] = useState(() => {
      return localStorage.getItem('isAdmin') === 'true'; // Retrieve value from localStorage
  });
  
  useEffect(() => {
      if (!isAdmin) {
          navigate('/admin-login'); // Redirect to login page if not authorized
      }
  }, [isAdmin, navigate]);
  useEffect(() => {

    const fetchfeedbacks = async () => {

      const response = axios.get('http://localhost:5000/api/fetch-feedbacks');
      const data = await response;
      setfeedbacks(data.data[0]);
    }

    fetchfeedbacks();

  }, [])

  useEffect(() => {
    if (feedbacks)
      console.log(feedbacks);
  }, [feedbacks])


  return (
    <div>
      <h2 style={styles.h2}>Result List</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback.feedback_id} style={styles.teacherCard} onClick={() => navigate('/evaluation', { state: { feedback_id: feedback.feedback_id, teacherid: feedback.teacher_id, teacher_name: feedback.teacher_name, subject: feedback.name } })}>
          <h2 style={styles.header}>Teacher ID: {feedback.teacher_id}</h2>
          <h2 style={styles.header}>Teacher Name: {feedback.teacher_name}</h2>
          <h3 style={styles.subheader}>Subject Name: {feedback.name}</h3>
          <h3 style={styles.subheader}>Date: {feedback.last_updated}</h3>
          <table style={styles.table}>
            <tr>
              <th style={styles.th}>Avg_subject_knowledge</th>
              <th style={styles.th}>Avg_communication_effectiveness</th>
              <th style={styles.th}>Avg_communication_clarity</th>
              <th style={styles.th}>Avg_engagement</th>
              <th style={styles.th}>Avg_participation</th>
              <th style={styles.th}>Avg_responsiveness_approachability</th>
              <th style={styles.th}>Avg_responsiveness_effectiveness</th>
              <th style={styles.th}>Avg_punctuality</th>
              <th style={styles.th}>Avg_preparedness</th>
              <th style={styles.th}>Avg_critical_thinking</th>
            </tr>
            <tr>
              <td style={styles.td}>{feedback.avg_subject_knowledge}</td>
              <td style={styles.td}>{feedback.avg_communication_effectiveness}</td>
              <td style={styles.td}>{feedback.avg_communication_clarity}</td>
              <td style={styles.td}>{feedback.avg_engagement}</td>
              <td style={styles.td}>{feedback.avg_participation}</td>
              <td style={styles.td}>{feedback.avg_responsiveness_approachability}</td>
              <td style={styles.td}>{feedback.avg_responsiveness_effectiveness}</td>
              <td style={styles.td}>{feedback.avg_punctuality}</td>
              <td style={styles.td}>{feedback.avg_preparedness}</td>
              <td style={styles.td}>{feedback.avg_critical_thinking}</td>
            </tr>
          </table>
        </div>

      ))}
    </div>
  );
};

const styles = {
  h2: {
    textAlign: 'center',
    fontSize: '20px'
  },
  teacherCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '80%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    margin: '10px auto'
  },
  table: {
    // marginLeft: "10%",
    width: '80%',
    borderCollapse: 'collapse',
    // marginTop: '20px'
  },
  th: {
    // padding: '10px',
    border: '1px solid black',
    padding: '7px 1.5px',
    backgroundColor: '#f5f5f5',
    fontSize: '10px',
  },
  td: {
    // padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center'
  },
};

export default Display_result;
