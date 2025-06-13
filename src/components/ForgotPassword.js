import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const ForgotPassword = () => {

  const [rollno,setrollno] = useState('');
  const [email,setemail] = useState('');
  const [otp,setotp] = useState('');
  const [storedOTP,setstoredOTP] = useState('');
  const [expiredOTP,setexpiredOTP] = useState('');
  const [showforgetfield,setshowforgetfield] = useState(false);
  const [verified,setverified] = useState(false);

  const navigate = useNavigate();

  const fetchstudata = async(e)=>{
    e.preventDefault();
    if(rollno)
    {
      const response = await axios.post('/api/forgot-fetchstu-data',{rollno});
      if(response.data[0])
      {
        setemail(response.data[0][0].email);
        setshowforgetfield(true);
      }
    }
    else{

      alert("Enter RollNumber");
    }
  }
  
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds (2 minutes)
  const sendOTP = async(e)=>{
    e.preventDefault();

    const response = await axios.post("https://feedbacksystem-backend-8kxj.onrender.com/api/forgot-stu-pass",{email});
    if(response.data)
    {
      alert(response.data.message);
      setstoredOTP(response.data.OTP);
      setexpiredOTP(response.data.expiresAt);
      console.log(response.data);

      if (timeLeft <= 0) {
        alert("OTP Expired");
      }
  
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setTimeLeft(120);
            clearInterval(id); // Stop the timer when it reaches 0
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }
  
  const veritystudent = async(e)=>{
    e.preventDefault();

    if(Date.now() > expiredOTP)
    {
      alert("OTP Expired")
    }
    else
    {
      if(storedOTP == otp)
      {
        setverified(true);
      }
      else
      {
        alert("OTP Wrong");
      }
    }

  }


  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async(e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
        const response = await axios.post('https://feedbacksystem-backend-8kxj.onrender.com/stu-pass-change', {rollno, newPassword});

        if(response.data.affectedRows)
        {
          navigate('/login');
        }

    } else {
      alert('New password and confirm password do not match!');
    }
  };

  return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//     {!showforgetfield ? (
//       <form>
//         <p className="text-center mt-4 text-lg font-semibold">Enter Your Roll Number:</p>
//         <input
//           type="text"
//           placeholder="Enter Your Roll No."
//           value={rollno}
//           onChange={(e) => setrollno(e.target.value)}
//           className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500"
//         />
//         <button
//           onClick={fetchstudata}
//           className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     ) : (
//       <div>
//         {!verified ? (
//           <form>
//             <p className="text-center mt-4 text-lg font-semibold">{`OTP is sent to this email: ${email}`}</p>
//             <input
//               type="text"
//               placeholder="Enter OTP Code"
//               value={otp}
//               onChange={(e) => setotp(e.target.value)}
//               className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500"
//             />
//             <button
//               disabled={timeLeft !== 120}
//               onClick={sendOTP}
//               className={`w-full bg-blue-600 text-white font-semibold p-2 rounded-md mt-4 hover:bg-blue-700 transition duration-200 ${
//                 timeLeft !== 120 ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               Send OTP
//             </button>
//             <div className="text-center mt-2">
//               {timeLeft != 120 && <h3>OTP Expires in: {formatTime(timeLeft)}</h3>}
//               {timeLeft === 0 && (
//                 <p className="text-red-600 mt-2">OTP has expired. Please request a new one.</p>
//               )}
//             </div>
//             <button
//               onClick={veritystudent}
//               className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
//             >
//               Verify
//             </button>
//           </form>
//         ) : (
//           <div>
//             <h2 className="text-center text-lg font-semibold mt-4">Set New Password</h2>
//             <form>
//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500"
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500"
//               />
//               <button
//                 onClick={handleChangePassword}
//                 className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     )}
//   </div>
// </div>


<div className="flex justify-center items-center min-h-screen">
<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-red-500">
  <p className="text-center text-lg font-semibold text-gray-700">
    Forgot your password? Don&apos;t worry, we&apos;ve got you covered!
  </p>
  <p className="text-center text-sm text-gray-500 mt-2">
    Please follow the instructions carefully to reset your password. <br />
    <span className="text-red-600 font-medium">Note:</span> Do not refresh the page during this process.
  </p>

  {!showforgetfield ? (
    <form>
      <p className="text-center mt-6 text-xl font-semibold text-gray-800">Enter Your Roll Number:</p>
      <input
        type="text"
        placeholder="Enter Your Roll No."
        value={rollno}
        onChange={(e) => setrollno(e.target.value)}
        className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500 transition duration-200 hover:border-blue-400"
      />
      <button
        onClick={fetchstudata}
        className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md mt-6 hover:bg-blue-700 transition duration-200"
      >
        Reset Password
      </button>
    </form>
  ) : (
    <div>
      {!verified ? (
        <form>
          <p className="text-center mt-4 text-lg font-semibold text-gray-800">{`OTP is sent to this email: ${email}`}</p>
          <input
            type="text"
            placeholder="Enter OTP Code"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500 transition duration-200 hover:border-blue-400"
          />
          <button
            disabled={timeLeft !== 120}
            onClick={sendOTP}
            className={`w-full bg-blue-600 text-white font-semibold p-2 rounded-md mt-4 hover:bg-blue-700 transition duration-200 ${
              timeLeft !== 120 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Send OTP
          </button>
          <div className="text-center mt-2">
            {timeLeft !== 120 && <h3>OTP Expires in: {formatTime(timeLeft)}</h3>}
            {timeLeft === 0 && (
              <p className="text-red-600 mt-2">OTP has expired. Please request a new one.</p>
            )}
          </div>
          <button
            disabled={!otp}
            onClick={veritystudent}
            className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md mt-6 hover:bg-blue-700 transition duration-200"
          >
            Verify
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-center text-xl font-semibold mt-4 text-gray-800">Set New Password</h2>
          <form>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500 transition duration-200 hover:border-blue-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4 text-center focus:outline-none focus:border-blue-500 transition duration-200 hover:border-blue-400"
            />
            <button
              onClick={handleChangePassword}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  )}
  <p className="text-center text-sm text-gray-500 mt-6">
    Please do not refresh the page while the process is ongoing to ensure a smooth experience.
  </p>
</div>
</div>

  )
}

export default ForgotPassword
