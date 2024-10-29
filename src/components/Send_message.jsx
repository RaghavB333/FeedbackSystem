import React from "react";
import { useState } from "react";
import axios from "axios";
const Send_message = () => {
  const [Email, setEmail] = useState("");
  const students = [{ email: Email, token: "token1" }];

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/send-feedback-link",
        { students }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages.");
    }
  };
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', }}>
    <h1>Feedback System</h1>
    <div>
      <form action="">
        <label htmlFor="email">Enter Email: </label>
        <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
      </form>
    </div>
    <button onClick={sendMessage} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
      Send Message
    </button>
  </div>)
};

export default Send_message;
