import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const OverallPerformancePage = () => {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [teacherScores, setTeacherScores] = useState([]);
    const [universityAverage, setUniversityAverage] = useState(0);

    useEffect(() => {
        // Fetch distinct years
        const fetchYears = async () => {
            try {
                const response = await axios.get('/api/years');
                setYears(response.data);
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        };
        fetchYears();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            const fetchScores = async () => {
                try {
                    const response = await axios.get(`/api/overall-performance?year=${selectedYear}`);
                    const scores = response.data;

                    setTeacherScores(scores);

                    // Calculate university average
                    const totalScore = scores.reduce((sum, teacher) => sum + teacher.overall_score, 0);
                    setUniversityAverage((totalScore / scores.length).toFixed(2));
                } catch (error) {
                    console.error('Error fetching overall scores:', error);
                }
            };
            fetchScores();
        }
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const chartData = {
        labels: teacherScores.map(score => score.teacher_name),
        datasets: [
            {
                label: 'Overall Score per Teacher',
                data: teacherScores.map(score => score.overall_score),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'University Average',
                data: new Array(teacherScores.length).fill(universityAverage),
                type: 'line', // Use a line chart for university average
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Overall Performance</h2>

            <div className="mb-4">
                <label className="block text-lg font-medium">Select Year:</label>
                <select
                    className="p-2 border rounded"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    <option value="">-- Select Year --</option>
                    {years.map((year) => (
                        <option key={year.year} value={year.year}>
                            {year.year}
                        </option>
                    ))}
                </select>
            </div>

            {teacherScores.length > 0 ? (
                <>
                    <Bar data={chartData} options={chartOptions} />

                    <table className="mt-4 w-full border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Teacher ID</th>
                                <th className="border px-4 py-2">Teacher Name</th>
                                <th className="border px-4 py-2">Overall Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherScores
                                .sort((a, b) => b.overall_score - a.overall_score)
                                .map((score) => (
                                    <tr key={score.teacher_id}>
                                        <td className="border px-4 py-2">{score.teacher_id}</td>
                                        <td className="border px-4 py-2">{score.teacher_name}</td>
                                        <td className="border px-4 py-2">
                                            {parseFloat(score.overall_score).toFixed(1)}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </>
            ) : (
                selectedYear && <p>No data available for the selected year.</p>
            )}
        </div>
    );
};

export default OverallPerformancePage;
