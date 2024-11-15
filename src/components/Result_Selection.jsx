import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Overall Performance Box */}
                <div
                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                    onClick={() => navigate('/overall-performance')}
                >
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                        Overall Teacher Performance Analysis
                    </h2>
                    <p className="text-gray-600 text-center">
                        Explore the collective performance metrics across all teachers.
                    </p>
                </div>

                {/* Individual Performance Box */}
                <div
                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
                    onClick={() => navigate('/teachers-result')} // Wrap navigate in a function
                >
                    <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
                        Individual Teacher Performance Analysis
                    </h2>
                    <p className="text-gray-600 text-center">
                        Dive into detailed performance evaluations for individual teachers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultSelection;
