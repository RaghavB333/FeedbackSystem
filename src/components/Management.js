import React from 'react'
import { useState } from 'react';
import axios from 'axios';
const Management = () => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <div>
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
    </div>
  )
}

export default Management
