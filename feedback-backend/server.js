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

app.post('/login', async (req, res) => {
    const { rollNumber, password } = req.body;

    if (!rollNumber || !password) {
        return res.status(400).json({ error: 'Roll Number and Password are required.' });
    }

    try {
        const db = await getDbConnection();
        const [results] = await db.query('SELECT * FROM students WHERE rollNumber = ?', [rollNumber]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid roll number or password.' });
        }

        const student = results[0];

        // Directly compare the password
        if (student.password !== password) {
            return res.status(401).json({ error: 'Invalid roll number or password.' });
        }

        res.json(student); // Return the student data upon successful login
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error during login.' });
    }
});

app.post('/updateStudent', async (req, res) => {
    const { rollNumber, name, fname, contact, email, address, department, semester } = req.body;

    if (!rollNumber) {
        return res.status(400).send('Roll Number is required.');
    }

    try {
        const db = await getDbConnection();
        const sql = `
            UPDATE students SET 
                name = ?, fname = ?, contact = ?, email = ?, 
                address = ?, department = ?, semester = ? 
            WHERE rollNumber = ?
        `;
        const [result] = await db.query(sql, [name, fname, contact, email, address, department, semester, rollNumber]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found.');
        }
        res.send('Profile updated successfully.');
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send('Internal server error while updating student.');
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


// Tanpreet's code 

app.get('/api/students', async (req, res) => {
    const { branch, semester } = req.query;
  
    // console.log(branch,semester[0]);
  
    try {
        // Execute the query and log the result
        const result = await db.query(
            'SELECT * FROM student WHERE branch = ? AND semester = ?',
            [branch, semester[0]]
        );
  
        // Access rows correctly based on `mysql2` response structure
        const rows = result;
        res.json(rows);
  
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching student data');
    }
  });
  
  
  
  // const insertdata = async()=>{
  //   const sql = 'INSERT INTO student (Roll_No, name, fname, branch, semester, email, contact, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  //   try {
  //     const result = await db.query(sql, [2225032, "Sohit", "Ram", "BCA", 3, "Mohit@gmail.com", 756456567, "hoshiarpur"]);
  //     console.log('Inserted data with ID:', result.insertId);
  //   } catch (error) {
  //     console.error('Error inserting data:', error);
  //   }
  // }
  // insertdata();
  
  
  // Close the connection
  // db.end();
  
  // Nodemailer email function
  const sendEmail = async (toEmail,link) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tanpreetjhally300@gmail.com',
        pass: 'cprqlpgucugigkcc',
      },
    });
  
  
    const mailOptions = {
      from: 'tanpreetjhally300@gmail.com',
      to: toEmail,
      subject: 'Feedback Link',
      text: `Please click the following link to provide feedback: ${link}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Feedback link sent to ${toEmail}`);
    } catch (error) {
      console.error(`Error sending email to ${toEmail}:`, error);
    }
  };
  
  
  // Function to send feedback links to students
  const sendFeedbackLinks = async (emails,students,subject,teacher) => {
    const expiryTime = Date.now() + 60 * 1000;
    students.forEach((student) => {
      const feedbackLink = `http://localhost:5173/feedback?roll_no=${student.Roll_No}&name=${encodeURIComponent(student.name)}&subject=${encodeURIComponent(subject)}&teacher=${encodeURIComponent(teacher)}&expiryTime=${expiryTime}`;
      if (student.email) {
        // Send feedback link via email
        console.log(student.email);
        sendEmail(student.email,feedbackLink);
      }
    });
  };
  
  // Endpoint to trigger sending feedback links
  app.post('/send-feedback-link', async (req, res) => {
    const { emails,students,subject,teacher } = req.body;  // Expecting an array of students with email or phone and token
    
    // console.log("emails:",emails," students:" , students)
    try {
      await sendFeedbackLinks(emails,students,subject,teacher);
      res.status(200).json({ message: 'Feedback links sent to selected students' });
    } catch (error) {
      console.error('Error sending feedback links:', error);
      res.status(500).json({ message: 'Error sending feedback links', error });
    }
  });
  
  // Admin Login
  app.post('/admin-login', async (req, res) => {
    const { username, password} = req.body;  // Expecting an array of students with email or phone and token
    
      const result = await db.query(
        'SELECT * FROM adminlogin WHERE username = ? AND password = ?',
        [username, password]
    );
      if(result)
      {
        res.status(200).json(result);
      }
  });
  
  // fetch teachers 
  app.post('/fetch-teacher', async (req, res) => {
    const { branch} = req.body;  // Expecting an array of students with email or phone and token
    
      const result = await db.query(
        'SELECT teacher_name,teacher_id FROM teacher WHERE department = ?',
        [branch]
    );
      if(result)
      {
        res.status(200).json(result);
      }
  });

  // End of Tanpreet's code 

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
