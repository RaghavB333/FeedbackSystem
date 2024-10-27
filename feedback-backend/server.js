const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3235', // replace with your MySQL password
    database: 'registration_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/register', (req, res) => {
    const { name, fname, rollNumber, contact, email, address, department, semester } = req.body;
    const query = 'INSERT INTO students (name, fname, rollNumber, contact, email, address, department, semester) VALUES (Raghav, Yogesh, 32, 123, rb, hsp, BCA, 5)';
    db.query(query, [name, fname, rollNumber, contact, email, address, department, semester], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('Registration successful');
        }
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
