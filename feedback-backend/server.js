const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // MySQL library

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '3235', // Replace with your MySQL password
    database: 'registration_db' // Replace with your database name
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        return console.error('Error connecting to MySQL:', err);
    }
    console.log('Connected to MySQL');
});

// Register route
app.post('/register', (req, res) => {
    // Log the incoming request body for debugging
    console.log('Request body:', req.body);

    const { name, fname, rollNumber, contact, email, address, department, semester } = req.body;

    // Simple validation
    if (!name || !rollNumber || !email) {
        return res.status(400).send('Name, Roll Number, and Email are required.');
    }

    // Optional: Check for existing roll number
    const checkRollNumberQuery = 'SELECT * FROM students WHERE rollNumber = ?';
    db.query(checkRollNumberQuery, [rollNumber], (err, results) => {
        if (err) {
            console.error('Error checking roll number:', err);
            return res.status(500).send('Internal server error.');
        }
        if (results.length > 0) {
            return res.status(400).send('Roll Number already exists.');
        }

        // Check for existing email
        const checkEmailQuery = 'SELECT * FROM students WHERE email = ?';
        db.query(checkEmailQuery, [email], (err, results) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).send('Internal server error.');
            }
            if (results.length > 0) {
                return res.status(400).send('Email already exists.');
            }

            // Insert new student record
            const sql = `
                INSERT INTO students (name, fname, rollNumber, contact, email, address, department, semester)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(sql, [name, fname, rollNumber, contact, email, address, department, semester], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).send(`Failed to register. Error: ${err.sqlMessage || err.message}`);
                }
                res.send('Registration successful!');
            });
        });
    });
});

// Fetch student data by roll number
app.get('/student/:rollNumber', (req, res) => {
    const rollNumber = req.params.rollNumber;

    // Query to fetch student data
    const sql = 'SELECT * FROM students WHERE rollNumber = ?';
    db.query(sql, [rollNumber], (err, results) => {
        if (err) {
            console.error('Error fetching student data:', err);
            return res.status(500).send('Internal server error.');
        }
        if (results.length === 0) {
            return res.status(404).send('Student not found.');
        }
        res.json(results[0]); // Send back the first matching record
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
