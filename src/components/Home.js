// src/Home.js
import React from 'react';

const Home = () => {
  return (
    <div>
      <header className="hero h-64 flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558631534-3ff9ac4a46a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGJhY2tncm91bmQlMjBmaW5hbHxlbnwwfHx8fDE2OTI3NjU5MDE&ixlib=rb-1.2.1&q=80&w=1080')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold text-white text-center">Welcome to the Feedback System</h1>
          <p className="mt-2 text-lg text-gray-300 text-center">Your opinions matter! Share your feedback and help us improve.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-around mb-8">
          <div className="bg-white shadow-lg rounded-lg mx-10 p-6 mb-4 md:mb-0 w-full md:w-1/2 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold mb-2">1. Register</h3>
            <p className="text-gray-600 mb-4">Create your account to provide feedback.</p>
            <a href="/registration" className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Register Now
            </a>
          </div>
         
          <div className="bg-white shadow-lg rounded-lg mx-10 p-6 w-full md:w-1/2 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold mb-2">2. View Insights</h3>
            <p className="text-gray-600 mb-4">Analyze feedback data to enhance the learning experience.</p>
            <a href="/insights" className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Insights
            </a>
          </div>
        </div>

        <footer className="text-center mt-10">
          <p className="text-gray-600">© 2024 Feedback System. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
