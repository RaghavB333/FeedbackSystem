const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '3235',
    database: 'registration_db'
};

// Function to get a database connection
async function getDbConnection() {
    return mysql.createConnection(dbConfig);
}

// Register route (without password)
app.post('/register', async (req, res) => {
    const { name, fname, rollNumber, contact, email, address, department, semester } = req.body;

    if (!name || !rollNumber || !email) {
        return res.status(400).send('Name, Roll Number, and Email are required.');
    }

    try {
        const db = await getDbConnection();

        // Check for existing roll number
        const [rollNumberCheck] = await db.query('SELECT * FROM students WHERE rollNumber = ?', [rollNumber]);
        if (rollNumberCheck.length > 0) {
            return res.status(400).send('Roll Number already exists.');
        }

        // Check for existing email
        const [emailCheck] = await db.query('SELECT * FROM students WHERE email = ?', [email]);
        if (emailCheck.length > 0) {
            return res.status(400).send('Email already exists.');
        }

        // Insert new student record without password
        const sql = `
            INSERT INTO students (name, fname, rollNumber, contact, email, address, department, semester)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [name, fname, rollNumber, contact, email, address, department, semester]);
        res.send('Registration successful!');
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).send('Internal server error during registration.');
    }
});

// Set Password route
app.post('/set-password', async (req, res) => {
    const { rollNumber, password } = req.body;

    if (!rollNumber || !password) {
        return res.status(400).send('Roll Number and Password are required.');
    }

    try {
        const db = await getDbConnection();
        const [result] = await db.query('UPDATE students SET password = ? WHERE rollNumber = ?', [password, rollNumber]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found.');
        }
        res.send('Password set successfully!');
    } catch (error) {
        console.error('Error setting password:', error);
        res.status(500).send('Failed to set password.');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { rollNumber, password } = req.body;

    if (!rollNumber || !password) {
        return res.status(400).send('Roll Number and Password are required.');
    }

    try {
        const db = await getDbConnection();
        const [results] = await db.query('SELECT * FROM students WHERE rollNumber = ? AND password = ?', [rollNumber, password]);

        if (results.length === 0) {
            return res.status(401).send('Invalid roll number or password.');
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error during login.');
    }
});

// Feedback submission route
app.post('/submitFeedback', async (req, res) => {
    const { teacher_rollNumber, ratings } = req.body;

    if (!teacher_rollNumber || !ratings || typeof ratings !== 'object') {
        return res.status(400).send('Teacher Roll Number and ratings are required.');
    }

    try {
        const db = await getDbConnection();

        // Fetch student ID from the session (mock implementation)
        const studentRollNumber = 'mockStudentRollNumber'; // Replace with actual student roll number from session
        const [studentResults] = await db.query('SELECT id FROM students WHERE rollNumber = ?', [studentRollNumber]);
        const student_id = studentResults[0]?.id; // Adjust based on your actual column name

        // Fetch teacher ID based on the roll number
        const [teacherResults] = await db.query('SELECT teacher_id FROM teachers WHERE rollNumber = ?', [teacher_rollNumber]);
        const teacher_id = teacherResults[0]?.teacher_id; // Adjust based on your actual column name

        if (!student_id || !teacher_id) {
            return res.status(404).send('Student or Teacher not found.');
        }

        // Calculate total score
        const weights = {
            subject_knowledge: 0.25,
            communication_effectiveness: 0.20,
            communication_clarity: 0.20,
            engagement: 0.20,
            participation: 0.15,
            responsiveness_approachability: 0.15,
            responsiveness_effectiveness: 0.10,
            punctuality: 0.10,
            preparedness: 0.10,
            critical_thinking: 0.10
        };

        const totalScore = Object.keys(weights).reduce((acc, parameter) => {
            const rating = parseFloat(ratings[parameter]) || 0;
            return acc + rating * weights[parameter];
        }, 0);

        // Prepare data for insertion
        const feedbackDate = new Date();
        const feedbackEntries = Object.entries(ratings).map(([parameter_id, rating]) => [
            student_id,
            teacher_id,
            parameter_id,
            rating,
            feedbackDate
        ]);

        // SQL query to insert multiple feedback entries
        const feedbackSql = `
            INSERT INTO student_feedback (student_id, teacher_id, parameter_id, rating, feedback_date)
            VALUES ?
        `;
        await db.query(feedbackSql, [feedbackEntries]);

        // Store total score in feedback_scores table
        const scoreSql = `
            INSERT INTO feedback_scores (student_id, teacher_id, total_score, feedback_date)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(scoreSql, [student_id, teacher_id, totalScore, feedbackDate]);

        res.send('Feedback submitted successfully!');
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).send('Internal server error while submitting feedback.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
