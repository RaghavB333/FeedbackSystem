import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Feedback_taken = ({onUpdate}) => {
    
    const [students, setStudents] = useState([]);
    const [formData, setformData] = useState([]);
    const [feedbackid,setfeedbackid] = useState('');
    const [isEditing, setisEditing] = useState(false);
    const [change,setchange] = useState('');
    const [rollNumber,setrollNumber] = useState(''); 
    const location = useLocation();
    const { branch, semester,subject,teacher,teacherid,subjectid } = location.state || {};
    const navigate = useNavigate();
    const { isAdmin } = useAuth(); // Get admin status from context


    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin-login'); // Redirect to login page if not authorized
        }
    }, [isAdmin, navigate]);

    

    useEffect(() => {
        // Fetch students data if branch and semester are available
        if (branch && semester) {
            const fetchStudents = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/students', {
                        params: { branch, semester }
                    });
                    setStudents(response.data[0]);
                } catch (error) {
                    console.error('Error fetching student data:', error);
                }
            };
            fetchStudents();
        }
    }, [branch, semester,change]);


    const createfeedback = async(e)=>{
        e.preventDefault();
        try{

            const response = await axios.post('http://localhost:5000/api/feedback-created', {teacherid,subjectid});
            
            setfeedbackid(await response.data.insertId);
            

        }catch(error){
            console.error("Feedback not created",error);
        }
    }

    useEffect(() => {
        const sendMessage = async () => {
            try {
              const response = await axios.post(
                "http://localhost:5000/send-feedback-link",
                { feedbackid,students,subject,teacher }
                
              );
              alert(response.data.message);
            } catch (error) {
              console.error("Error sending messages:", error);
              alert("Failed to send messages.");
            }
          };
          if(feedbackid)
          {
            sendMessage();
          }
    }, [feedbackid])
    
    const deletestudent = async(rollno)=>{
        try {
            const response = await axios.post(
              "http://localhost:5000/api/delete-student",
              { rollno}
            );
            setchange(response.data);
          } catch (error) {
            console.error(error);
          }
    }

    const editstudent = (rollno)=>{
        setrollNumber(rollno);

        for(let student=0;student<students.length;student++)
        {
            if(students[student].rollNumber == rollno)
            {
                setformData(students[student]);
            }
        }

        setisEditing(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value);
        setformData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await onUpdate(formData);
            setchange('');
            setisEditing(false);
        } catch (error) {
            console.error(error)
        }
    }
  



  return (
    <div>
        <h2 style={styles.heading}>Student List</h2>
      {students.length > 0 ? (
                <>
                {isEditing ?
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['name', 'fname', 'contact', 'email', 'address', 'department', 'semester'].map((field) => (
                            <div key={field}>
                                <label className="block font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Save Changes</button>
                    </form>
                :<>
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
                            <tr key={student.rollNumber}>
                                <td style={styles.td}>{student.rollNumber}</td>
                                <td style={styles.td}>{student.name}</td>
                                <td style={styles.td}>{student.fname}</td>
                                <td style={styles.td}>{student.email}</td>
                                <td style={styles.td}>{student.contact}</td>
                                <td style={styles.td}>{student.department}</td>
                                <td style={styles.td}>{student.semester}</td>
                                <td style={styles.td}>
                                    <button onClick={()=>deletestudent(student.rollNumber)} style={styles.dlt_btn}>Delete</button>
                                    <button onClick={()=>editstudent(student.rollNumber)} style={styles.edit_btn}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div>
                    <button onClick={createfeedback} style={styles.send_btn}>Take Feedback</button>
                </div>
                </>}
                
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
