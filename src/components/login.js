import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [rollNumber, setRollNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { rollNumber, password });
            const studentData = response.data;

            // Pass the student data and roll number to the parent through onLogin
            onLogin({ ...studentData, rollNumber });

            // Navigate to the dashboard
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <img src="https://ptu.ac.in/wp-content/themes/cynic/images/classic-logo.png" alt="" width={100} height={100} className='mx-auto' />
                <h2 className="text-2xl text-blue-800">Hello,</h2>
                <h2 className="text-2xl font-bold text-blue-800 mb-6">Welcome Back!</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            placeholder="Roll Number"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 509.319 509.319" width="30" height="30">
                                    <g>
                                        <path d="M488.942,188.222L488.942,188.222c-16.507-24.031-36.159-45.743-58.432-64.555l60.096-60.075   c12.135-12.848,11.558-33.101-1.29-45.236c-12.346-11.661-31.65-11.647-43.979,0.031l-69.248,69.269   c-37.697-18.837-79.311-28.5-121.451-28.203C159.882,60.36,71.893,108.716,20.334,188.222c-27.112,39.874-27.112,92.264,0,132.139   c16.507,24.031,36.159,45.743,58.432,64.555L18.67,445.054c-12.501,12.501-12.501,32.769,0,45.269   c12.501,12.501,32.769,12.501,45.269,0l69.248-69.269c37.697,18.837,79.311,28.5,121.451,28.203   c94.756-0.905,182.745-49.262,234.304-128.768C516.112,280.586,516.112,228.125,488.942,188.222z M73.113,284.222   c-12.285-18.016-12.285-41.717,0-59.733C112.451,162.079,180.866,124,254.638,123.454c24.861-0.121,49.543,4.215,72.875,12.8   l-39.552,39.531c-43.381-18.416-93.478,1.823-111.893,45.204c-9.046,21.309-9.046,45.38,0,66.689l-51.989,52.011   C104.466,323.794,87.295,305.106,73.113,284.222z M436.163,284.222c-39.339,62.41-107.754,100.489-181.525,101.035   c-24.861,0.121-49.543-4.215-72.875-12.8l39.552-39.552c43.381,18.416,93.478-1.823,111.893-45.204   c9.046-21.309,9.046-45.38,0-66.689l51.989-51.989c19.612,15.895,36.783,34.583,50.965,55.467   C448.448,242.505,448.448,266.206,436.163,284.222L436.163,284.222z" />
                                    </g>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" /></svg>
                            )}
                        </button>

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                    {message && <p className="text-red-600 text-center">{message}</p>}
                    <p className="text-blue-600 text-end"><a href='http://localhost:3000/forgot-password'>Forgot Password?</a></p>
                </form>
                <div className='flex justify-center gap-5 mt-2'>
                    <a href="https://ptu.ac.in/" target="_blank" rel="noopener noreferrer">
                        <div className='rounded-full hover:bg-gray-400 p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30" version="1.1"><g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)"><path d="m11.891,14.649l-3.98,8.765c-.159.351-.524.579-.91.586-.378,0-.725-.214-.895-.553l-1.379-2.759-3.019,3.019c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l3.019-3.019-2.759-1.379c-.345-.173-.56-.527-.553-.913s.235-.732.586-.892c0,0,8.734-3.97,8.765-3.98.728-.246,1.519-.066,2.062.479.545.544.728,1.334.479,2.062Zm12.109-2.649c0,6.617-5.382,11.999-11.999,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0-.367,0-.73-.017-1.089-.049-.55-.049-.956-.534-.907-1.085.049-.549.524-.956,1.085-.907.173.015.35.017.526.024.669-.665,2.395-2.518,3.607-4.983h-.722c-.553,0-1-.447-1-1s.447-1,1-1h1.528c.292-.953.472-1.961.472-3s-.182-2.048-.473-3H7.977c-.119.388-.225.782-.302,1.187-.103.542-.63.896-1.169.796-.543-.104-.899-.627-.796-1.169.052-.276.119-.545.188-.813h-3.399c-.013,0-.023-.007-.036-.007-.3.95-.464,1.96-.464,3.007,0,.307.015.611.041.911.049.551-.357,1.036-.907,1.085-.559.057-1.036-.357-1.085-.907-.032-.358-.049-.722-.049-1.089C0,5.383,5.383,0,12,0s12,5.383,12,12ZM9.394,2.357c-2.572.696-4.732,2.389-6.041,4.643h3.22c.789-1.881,1.88-3.475,2.821-4.643Zm5.834,4.643c-1.021-2.079-2.412-3.725-3.227-4.589-.813.863-2.195,2.516-3.216,4.589h6.442Zm2.194,0h3.225c-1.308-2.253-3.466-3.945-6.035-4.642.94,1.167,2.024,2.767,2.811,4.642Zm3.225,10h-3.225c-.787,1.875-1.87,3.475-2.811,4.642,2.569-.697,4.727-2.39,6.035-4.642Zm.889-1.993c.3-.95.464-1.96.464-3.007s-.164-2.057-.464-3.007c-.013,0-.023.007-.036.007h-3.403c.246.956.403,1.958.403,3s-.157,2.044-.403,3h3.403c.013,0,.023.007.036.007Z" fill="black" fill-opacity="1" data-original-color="#000000ff" stroke="none" stroke-opacity="1" /></g></svg>
                        </div>
                    </a>

                    <a href="https://www.facebook.com/ikgptu?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                        <div className='rounded-full hover:bg-gray-400 p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" width="30" height="30">
                                <g>
                                    <path d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509   V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073   c0-6.627,5.373-12,12-12S24,5.445,24,12.073z" />
                                </g>
                            </svg>
                        </div>
                    </a>

                    <a href="https://www.instagram.com/ikgujralptu?igsh=NnVlY2UxNDQxNGg0" target="_blank" rel="noopener noreferrer">
                        <div className='rounded-full hover:bg-gray-400 p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" width="30" height="30">
                                <g>
                                    <path d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608   c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608   c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07   c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849   c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311   C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014   C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038   c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072   c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12   c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942   C15.668,0.014,15.259,0,12,0z" />
                                    <path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162   C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z" />
                                    <circle cx="18.406" cy="5.594" r="1.44" />
                                </g>

                            </svg>
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/company/i-k-gujral-punjab-technical-university/" target="_blank" rel="noopener noreferrer">
                        <div className='rounded-full hover:bg-gray-400 p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" width="30" height="30">
                                <g>
                                    <path d="M24,2.176C24,0.974,23.026,0,21.824,0H2.176C0.974,0,0,0.974,0,2.176v19.649C0,23.026,0.974,24,2.176,24h19.649   C23.026,24,24,23.026,24,21.824V2.176z M7.997,4.685c0.798,0,1.466,0.625,1.466,1.444c0,0.82-0.668,1.445-1.466,1.445   c-0.798,0-1.466-0.625-1.466-1.445C6.531,5.31,7.199,4.685,7.997,4.685z M17.806,18.505c-1.488,0-2.199-0.883-2.199-2.091   c0-0.345,0.043-0.711,0.151-1.078l0.712-2.544c0.086-0.28,0.108-0.539,0.108-0.776c0-0.819-0.496-1.315-1.294-1.315   c-1.013,0-1.682,0.727-2.027,2.129l-1.38,5.535H9.462l0.433-1.739c-0.71,1.166-1.695,1.888-2.911,1.888   c-1.466,0-2.156-0.845-2.156-2.117c0-0.323,0.043-0.719,0.129-1.085l1.1-4.492H4.354l0.517-1.909h4.096L7.35,15.324   c-0.108,0.41-0.151,0.75-0.151,0.987c0,0.41,0.202,0.53,0.518,0.601c0.192,0.043,1.724,0.013,2.559-1.841l1.062-4.253H9.613   l0.517-1.909h3.687l-0.474,2.167c0.647-1.208,1.94-2.355,3.212-2.355c1.358,0,2.48,0.968,2.48,2.822   c0,0.474-0.065,0.99-0.237,1.572l-0.69,2.479C18.043,15.854,18,16.069,18,16.263c0,0.431,0.173,0.647,0.496,0.647   c0.323,0,0.733-0.238,1.207-1.552l0.949,0.366C20.091,17.686,19.078,18.505,17.806,18.505z" />
                                </g>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
