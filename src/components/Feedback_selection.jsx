import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Feedback_selection = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth(); // Get admin status from context

    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');
    const [teacherid, setteacherid] = useState();
    const [subjectid, setsubjectid] = useState();

    const [Teachers, setTeachers] = useState([]);
    const [Subjects, setSubjects] = useState([]);

    // Check if the user is authorized (e.g., check for admin status)
    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin-login'); // Redirect to login page if not authorized
        }
    }, [isAdmin, navigate]);

    const [branches,setbranches] = useState([]);

    useEffect(() => {
      const fetchbranches = async()=>{
        const response = await axios.get('http://localhost:5000/api/fetch-branches');
        setbranches(await response.data[0]);
      }
      fetchbranches();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/feedbacktaken', { state: { branch, semester, subject, teacher, teacherid, subjectid } });
    };

    useEffect(() => {
        const fetchteachers = async () => {
            const response = await axios.post("http://localhost:5000/fetch-teacher", { branch });
            setTeachers(response.data[0]);
        };

        if (branch) {
            fetchteachers();
        }
    }, [branch]);

    useEffect(() => {
        const fetchsubject = async () => {
            const response = await axios.post("http://localhost:5000/fetch-subjects", { branch, semester });
            setSubjects(response.data[0]);
        };

        if (branch && semester) {
            fetchsubject();
        }
    }, [branch, semester]);

    useEffect(() => {
        const selectedTeacher = Teachers.find(a => a.teacher_name === teacher);
        if (selectedTeacher) {
            setteacherid(selectedTeacher.teacher_id);
        }
    }, [teacher, Teachers]);

    useEffect(() => {
        const selectedSubject = Subjects.find(a => a.name === subject);
        if (selectedSubject) {
            setsubjectid(selectedSubject.subject_id);
        }
    }, [subject, Subjects]);

    return (
        <div style={styles.container}>
            {isAdmin ? (
                <>
                    <h2>Feedback Selection for branch</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <label style={styles.label}>Select Branch:</label>
                        <select value={branch} onChange={(e) => setBranch(e.target.value)} style={styles.select}>
                            <option value="" disabled>Select Branch</option>
                            <option value="CSE">B.Tech CSE</option>
                            <option value="Civil">B.Tech Civil</option>
                            <option value="ME">B.Tech ME</option>
                            <option value="BCA">BCA</option>
                        </select>

                        <label style={styles.label}>Select Semester:</label>
                        <select value={semester} onChange={(e) => setSemester(e.target.value)} style={styles.select}>
                            <option value="" disabled>Select Semester</option>
                            {branch !== "BCA" ? (
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

<<<<<<< HEAD
    
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
                    {branches.map((branch)=>(
                      <option key={branch.branch_id} value={branch.name}>{branch.name}</option>
                    ))}
                </select>
=======
                        <label style={styles.label}>Select Subject:</label>
                        <select value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.select}>
                            <option value="" disabled>Select Subject</option>
                            {Subjects.map((subject) => (
                                <option key={subject.subject_id} value={subject.name}>{subject.name}</option>
                            ))}
                        </select>
>>>>>>> 4d5c6651970374219081cfd5602e25dd3fc8638d

                        <label style={styles.label}>Select Teacher:</label>
                        <select value={teacher} onChange={(e) => setTeacher(e.target.value)} style={styles.select}>
                            <option value="" disabled>Select Teacher</option>
                            {Teachers.map((teacher) => (
                                <option key={teacher.teacher_id} value={teacher.teacher_name}>{teacher.teacher_name}</option>
                            ))}
                        </select>

                        <button type="submit" style={styles.button}>Submit</button>
                    </form>
                </>
            ) : (
                <div>You are not authorized to access this page.</div>
            )}
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

export default Feedback_selection;
