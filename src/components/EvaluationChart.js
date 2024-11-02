import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register the components (including scales)
Chart.register(...registerables);

const EvaluationChart = ({ ratings }) => {
    // Check if ratings is defined and is an object
    const isValidRatings = ratings && typeof ratings === 'object' && !Array.isArray(ratings);

    console.log('Ratings prop:', ratings);
    console.log('Is ratings an object:', isValidRatings);
    console.log('Number of keys in ratings:', isValidRatings ? Object.keys(ratings).length : 0);

    // This line will return if ratings is not valid or has no keys
    if (!isValidRatings || Object.keys(ratings).length === 0) {
         return //<div>No ratings available</div>;
    }

    const data = {
        labels: Object.keys(ratings).map(param => param.replace(/_/g, ' ')),
        datasets: [
            {
                label: 'Average Ratings',
                data: Object.values(ratings),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 5, // Assuming rating is out of 5
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default EvaluationChart;
