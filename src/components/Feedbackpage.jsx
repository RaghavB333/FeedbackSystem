import React from 'react'
import { useLocation } from 'react-router-dom';

const Feedbackpage = () => {

    const location = useLocation();

    // Parse the query parameters directly from the URL
    const queryParams = new URLSearchParams(location.search);
    const rollNo = queryParams.get('roll_no');
    const name = queryParams.get('name');
    const subject = queryParams.get('subject');
    const teacher = queryParams.get('teacher');
    const expirytime = queryParams.get('expiryTime');
    
  return (
    <div>
      {Date.now() > expirytime ? <p> Expired link</p>
      :<>
        <h2>Welcome, {name}</h2>
        <p><strong>Roll Number:</strong> {rollNo}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Teacher Name:</strong> {teacher}</p>
        </>}
    </div>
  )
}

export default Feedbackpage
