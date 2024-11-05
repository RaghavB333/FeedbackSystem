import React from 'react'
import { useState,useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios';
=======
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

>>>>>>> 4d5c6651970374219081cfd5602e25dd3fc8638d
const Management = () => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { isAdmin } = useAuth(); // Get admin status from context


    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin-login'); // Redirect to login page if not authorized
        }
    }, [isAdmin, navigate]);

    const [newTeacher, setnewTeacher] = useState('');
    const [branch, setBranch] = useState([]);
    const [newbranch, setnewbranch] = useState('');
    const [branches,setbranches] = useState([]);

    useEffect(() => {
      const fetchbranches = async()=>{
        const response = await axios.get('http://localhost:5000/api/fetch-branches');
        setbranches(await response.data[0]);
      }
      fetchbranches();
    }, [])
    

    const handleChangePassword = async(e)=>{
        e.preventDefault();
        if(newPassword === confirmPassword)
        {
            const response = await axios.post('http://localhost:5000/api/admin-pass-change',{newPassword});
            console.log(response.data);
            alert("Password Changed");
        }
        else{
            alert("Password do not match");
        }
    }

    const addnewteacher = async()=>{
      if(newTeacher && branch)
      {
        const response = await axios.post('http://localhost:5000/api/add-new-teacher',{newTeacher,branch});
      }
      else{
        alert("Enter Teacher name and Select the Branch");
      }
    }


    const handleCheckboxChange = (e) => {
      const value = e.target.value;
      setBranch((prev) => {
        // Convert `value` to a string to ensure consistent comparison
        const selectedValue = value.toString();
        const updatedBranches = Array.isArray(prev) ? prev : [];
        
        if (updatedBranches.includes(selectedValue)) {
          // Remove the branch if already selected
          console.log("Removing:", selectedValue);
          return updatedBranches.filter((b) => b !== selectedValue);
        } else {
          // Add the branch if not selected
          console.log("Adding:", selectedValue);
          return [...updatedBranches, selectedValue];
        }
      });
    };

  const [subject, setsubject] = useState('');

  const [semester, setsemester] = useState('');

  const [subjectid, setsubjectid] = useState('');

  const handleAddValue = async() => {

    if(newbranch && semester && subjectid && subject)
      {
        const response = await axios.post('http://localhost:5000/api/add-brach-semester-subject',{newbranch,semester,subjectid,subject});
      }
      else{
        alert("Enter branch name, semester, subject code and subject name");
      }


  };
  return (
    <div>
    <h2>Change Password</h2>
      <form>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ display: 'block', border: '1px solid black', margin: '10px auto', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ display: 'block', border: '1px solid black', margin: '10px auto', padding: '8px' }}
        />
        <button onClick={handleChangePassword} style={{ margin: '10px' }} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      <h2>Add new teacher</h2>
      <form>
        <input
          type="text"
          placeholder="Enter Teacher name"
          value={newTeacher}
          onChange={(e) => setnewTeacher(e.target.value)}
          style={{ display: 'block', border: '1px solid black', margin: '10px auto', padding: '8px' }}
        />
        <label>Select Branch For Teacher:</label>
                <div style={{ display: 'block', margin: '10px auto', padding: '8px' }}>
    {branches.map((branchItem) => (
      <div key={branchItem.branch_id}>
        <input
          type="checkbox"
          value={branchItem.branch_id.toString()} // Convert to string for consistency
          checked={branch.includes(branchItem.branch_id.toString())} // Convert here as well
          onChange={handleCheckboxChange}
        />
        <label>{branchItem.name}</label>
      </div>
    ))}
  </div>
        <button onClick={addnewteacher} style={{ margin: '10px' }} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Teacher
        </button>
      </form>
      <hr></hr>

      <h2>Add New Branch</h2>
      <div style={{ padding: '20px' }}>
      <input
        type="text"
        value={newbranch}
        onChange={(e) => setnewbranch(e.target.value)} // Update input field
        placeholder="Enter Branch Name"
        style={{ padding: '8px', marginRight: '10px', border: '1px solid black' }}
      />
      <input
        type="text"
        value={semester}
        onChange={(e) => setsemester(e.target.value)} // Update input field
        placeholder="Enter Semester"
        style={{ padding: '8px', marginRight: '10px', border: '1px solid black' }}
      />
      <input
        type="text"
        value={subjectid}
        onChange={(e) => setsubjectid(e.target.value)} // Update input field
        placeholder="Enter Subject Code"
        style={{ padding: '8px', marginRight: '10px', border: '1px solid black' }}
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setsubject(e.target.value)} // Update input field
        placeholder="Enter Subject name"
        style={{ padding: '8px', marginRight: '10px', border: '1px solid black' }}
      />
      <button
        onClick={handleAddValue}
        style={{ padding: '8px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Add
      </button>
    </div>


    </div>
  )
}

export default Management
