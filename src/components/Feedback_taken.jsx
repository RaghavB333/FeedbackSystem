import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const Feedback_taken = () => {
    
    const [students, setStudents] = useState([]);
    const [Email, setEmail] = useState("");
    // const emails = [{ email: Email, token: "token1" }];
    const emails = Email;
    const location = useLocation();
    const { branch, semester,subject,teacher } = location.state || {};

    // if (students.length > 0) {
    //     const stu_emails = students.map((e) => e.email);
    //     setEmail(stu_emails);
    // }

    useEffect(() => {
        if (students.length > 0) {
            const emailsList = students.map((e) => e.email);
            setEmail(emailsList);
        } else {
            setEmail([]); // Clear emails if students array is empty
        }
    }, [students]);

    

    useEffect(() => {
        // Fetch students data if branch and semester are available
        if (branch && semester) {
            const fetchStudents = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/students', {
                        params: { branch, semester }
                    });
                    console.log(response.data[0]);
                    setStudents(response.data[0]);
                } catch (error) {
                    console.error('Error fetching student data:', error);
                }
            };
            fetchStudents();
        }
    }, [branch, semester]);


  const sendMessage = async () => {
    try {
        console.log(emails);
      const response = await axios.post(
        "http://localhost:5000/send-feedback-link",
        { emails,students,subject,teacher }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages.");
    }
  };



  return (
    <div>
        <h2 style={styles.heading}>Student List</h2>
      {students.length > 0 ? (
                <>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Roll Number</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Father Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Contact</th>
                            <th style={styles.th}>Branch</th>
                            <th style={styles.th}>Semester</th>
                            <th style={styles.th}>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.Roll_No}>
                                <td style={styles.td}>{student.rollNumber}</td>
                                <td style={styles.td}>{student.name}</td>
                                <td style={styles.td}>{student.fname}</td>
                                <td style={styles.td}>{student.email}</td>
                                <td style={styles.td}>{student.contact}</td>
                                <td style={styles.td}>{student.department}</td>
                                <td style={styles.td}>{student.semester}</td>
                                <td style={styles.td}>
                                    <button style={styles.dlt_btn}>Delete</button>
                                    <button style={styles.edit_btn}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div>
                    <button onClick={sendMessage} style={styles.send_btn}>Take Feedback</button>
                </div>
                </>
                
            ) : (
                <p>No students found for the selected branch and semester.</p>
            )}
    </div>
  )
};

const styles = {
    heading: {
        marginLeft: "43%",
    },
    table: {
        marginLeft: "10%",
        width: '80%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    th: {
        padding: '10px',
        border: '1px solid black',
        backgroundColor: '#f5f5f5'
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center'
    },
    dlt_btn: {
        padding: '5px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'red',
        color: '#fff',
        cursor: 'pointer',
    },
    edit_btn: {
        padding: '5px',
        marginLeft: '4px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    send_btn: {
        padding: '10px',
        marginLeft: '80%',
        marginTop: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    }
};

export default Feedback_taken
