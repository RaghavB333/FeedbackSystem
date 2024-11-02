import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Feedback_selection = () => {

    const navigate = useNavigate();

    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');

    const [Teachers,setTeachers] = useState([]);
    const [Subjects,setSubjects] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any actions here, like form validation
        navigate('/feedbacktaken', { state: { branch, semester, subject,teacher } }); // Redirect to the Result page
    };


    useEffect(() => {
        
        const fetchteachers = async()=>{

            const response = await axios.post(
                "http://localhost:5000/fetch-teacher",
                { branch}
              );
              console.log(response.data[0]);
              setTeachers(response.data[0]);
        }

        fetchteachers();

        
    }, [branch]);

    useEffect(() => {
        
        const fetchsubject = async()=>{

            const response = await axios.post(
                "http://localhost:5000/fetch-subjects",
                { branch,semester}
              );
              console.log(response.data[0]);
              setSubjects(response.data[0]);
        }

        fetchsubject();

        
    }, [semester]);
    

    
  return (
    <div style={styles.container}>
            <h2>Feedback Selection for branch</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Branch Selection */}
                <label style={styles.label}>Select Branch:</label>
                <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    style={styles.select}
                >
                    <option value="" disabled>Select Branch</option>
                    <option value="CSE">B.Tech CSE</option>
                    <option value="Civil">B.Tech Civil</option>
                    <option value="ME">B.Tech ME</option>
                    <option value="BCA">BCA</option>
                </select>

                {/* Semester Selection */}
                <label style={styles.label}>Select Semester:</label>
                <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    style={styles.select}
                >
                    <option value="" disabled>Select Semester</option>
    {/* Render semesters based on branch */}
    {branch !== "BCA" ? (
        // Render semesters 1 to 8 for non-BCA branches
        <>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
        </>
    ) : (
        // Render semesters 1 to 6 for BCA branch
        <>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
        </>
    )}
                </select>

                {/* Subject Selection */}
                <label style={styles.label}>Select Subject:</label>
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={styles.select}
                >
                    <option value="" disabled>Select Subject</option>
                    {/* <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option> */}

                        {Subjects.map((subject)=>(
                        <option key={subject.subject_id} value={subject.name}>{subject.name}</option>
                    ))}
                </select>

                {/* Teacher Selection */}
                <label style={styles.label}>Select Teacher:</label>
                <select
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    style={styles.select}
                >
                    <option value="" disabled>Select Teacher</option>
                    {/* <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Prof. Johnson">Prof. Johnson</option>
                    <option value="Dr. Lee">Dr. Lee</option>
                    <option value="Dr. Williams">Dr. Williams</option> */}
                    {Teachers.map((teacher)=>(
                        <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                    ))}
                </select>

                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        marginTop: '80px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold'
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    }
};


export default Feedback_selection
