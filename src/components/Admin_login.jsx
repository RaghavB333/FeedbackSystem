import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
const Admin_login = () => {

  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const navigate = useNavigate();


    const handleLogin = async (e) => {
          e.preventDefault();
        
          // const response = await axios.post(
          //   "http://localhost:3000/admin-login",
          //   { username,password}
          // );

          setMessage('Login Successful!');
              setTimeout(() => {
                navigate('/feedbackselection');
              }, 2000);

          // if(response.data[0] && response.data[0].username === username && response.data[0].password === password )
          //   {
          //     setMessage('Login Successful!');
          //     setTimeout(() => {
          //       navigate('/feedbackselection');
          //     }, 2000);
          //   }
          //   else
          //   {
          //     setMessage('Invalid username and password');
            // } 

      };

    return (
      <div style={styles.container}>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
              />
              <button type="submit" style={styles.button}>Login</button>
          </form>
          {message && <p style={message === 'Login Successful!' ? styles.success : styles.error}>{message}</p>}
      </div>
  );
};

const styles = {
  container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '20px',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      paddingRight: '20px'
  },
  input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%'
  },
  button: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer'
  },
  error: {
      color: 'red',
      marginTop: '15px'
  },
  success: {
      color: 'green',
      marginTop: '15px'
  }
};

export default Admin_login
