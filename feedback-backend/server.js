const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const Sentiment = require('sentiment');
const nodemailer = require('nodemailer');
const session = require('express-session');
require('dotenv').config();


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '@Tanpreet#07',
    database: 'registration_db'
};


function adminAuth(req, res, next) {
    if (req.session.isAdmin) {
        next(); // Continue to the requested route
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
}


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


app.post('/api/forget-fetchstu-data', async(req,res)=>{
    const db = await getDbConnection();

    const {rollno} = req.body;

    const result = await db.query(
        `SELECT email FROM students WHERE RollNumber = ?`,
        [rollno]
    );

    if(result[0].length > 0)
    {
        res.status(200).json(result);
    }
})

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


// change student password

app.post('/stu-pass-change', async (req, res) => {
    const { rollno, newPassword } = req.body;
    const db = await getDbConnection();
    const query = `
            UPDATE students SET 
                password = ? WHERE rollNumber = ?
        `;

    const [result] = await db.query(query, [newPassword, rollno]);

    res.status(200).json(result);
})



app.post('/api/delete-student',async(req,res)=>{
    const {rollno} = req.body;
    const db = await getDbConnection();

    const result = await db.query(
        `DELETE FROM students WHERE rollNumber = ?`,
        [rollno]
    );
    console.log(result);
})

// sending OTP 
const sendOTPCode = async(email,otp)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tanpreetjhally300@gmail.com',
            pass: 'cprqlpgucugigkcc',
        },
    });

    const mailOptions = {
        from: 'tanpreetjhally300@gmail.com',
        to: email,
        subject: 'Forget OTP Code',
        text: `Your OTP Code is - ${otp} Dont share the otp with anyone`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
    }

}

app.post('/api/forget-stu-pass', async(req,res)=>{

    const db = await getDbConnection();

    const {email} = req.body;

    let otp = '';

    for(let i=1;i<=6;i++)
    {
        otp += Math.floor(Math.random() * 10).toString();
    }


    console.log(otp,email);

    try {
        // await sendOTPCode(email,otp);
        const expiresAt = Date.now() + 2 * 60 * 1000;
        res.status(200).json({ message: 'OTP Code Send',OTP:otp,expiresAt:expiresAt });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP', error });
    }
})


app.post('/api/admin-pass-change', async (req, res) => {
    const { newPassword } = req.body;
    const db = await getDbConnection();

    const query = `UPDATE admin SET password = ? WHERE username = ?`;
    const result = await db.query(query, [newPassword, "admin"]);

    res.send(result);
})


app.post('/api/feedback-created', async (req, res) => {
    const { teacherid, subjectid } = req.body;

    const db = await getDbConnection();

    const query = `
    INSERT INTO TeacherEvaluationSummary (teacher_id, subject_id, avg_subject_knowledge, avg_communication_effectiveness, avg_communication_clarity,
               avg_engagement, avg_participation, avg_responsiveness_approachability, avg_responsiveness_effectiveness,
               avg_punctuality, avg_preparedness, avg_critical_thinking, total_feedback_count) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const [result] = await db.query(query, [teacherid, subjectid, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    res.send(result);

})

app.post('/api/updateFeedback', async (req, res) => {
    const { feedback_id, ratings, } = req.body;

    console.log(feedback_id);

    if (!feedback_id || !ratings) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const query = `
        SELECT avg_subject_knowledge, avg_communication_effectiveness, avg_communication_clarity,
               avg_engagement, avg_participation, avg_responsiveness_approachability, avg_responsiveness_effectiveness,
               avg_punctuality, avg_preparedness, avg_critical_thinking, total_feedback_count 
        FROM TeacherEvaluationSummary
        WHERE feedback_id = ?
    `;

    // Define weights for each parameter

    try {
        const db = await getDbConnection();

        // Fetch current values for the teacher
        const [rows] = await db.query(query, [feedback_id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'feedback not found.' });
        }

        const currentData = rows[0];
        const newFeedbackCount = Number(currentData.total_feedback_count) + 1;

        // Calculate new weighted average for each rating
        const updatedData = {
            avg_subject_knowledge: ((Number(currentData.avg_subject_knowledge) * currentData.total_feedback_count) + Number(ratings.avg_subject_knowledge || 0)) / newFeedbackCount,
            avg_communication_effectiveness: ((Number(currentData.avg_communication_effectiveness) * currentData.total_feedback_count) + Number(ratings.avg_communication_effectiveness || 0)) / newFeedbackCount,
            avg_communication_clarity: ((Number(currentData.avg_communication_clarity) * currentData.total_feedback_count) + Number(ratings.avg_communication_clarity || 0)) / newFeedbackCount,
            avg_engagement: ((Number(currentData.avg_engagement) * currentData.total_feedback_count) + Number(ratings.avg_engagement || 0)) / newFeedbackCount,
            avg_participation: ((Number(currentData.avg_participation) * currentData.total_feedback_count) + Number(ratings.avg_participation || 0)) / newFeedbackCount,
            avg_responsiveness_approachability: ((Number(currentData.avg_responsiveness_approachability) * currentData.total_feedback_count) + Number(ratings.avg_responsiveness_approachability || 0)) / newFeedbackCount,
            avg_responsiveness_effectiveness: ((Number(currentData.avg_responsiveness_effectiveness) * currentData.total_feedback_count) + Number(ratings.avg_responsiveness_effectiveness || 0)) / newFeedbackCount,
            avg_punctuality: ((Number(currentData.avg_punctuality) * currentData.total_feedback_count) + Number(ratings.avg_punctuality || 0)) / newFeedbackCount,
            avg_preparedness: ((Number(currentData.avg_preparedness) * currentData.total_feedback_count) + Number(ratings.avg_preparedness || 0)) / newFeedbackCount,
            avg_critical_thinking: ((Number(currentData.avg_critical_thinking) * currentData.total_feedback_count) + Number(ratings.avg_critical_thinking || 0)) / newFeedbackCount,
            total_feedback_count: newFeedbackCount
        };


        const updateQuery = `
            UPDATE TeacherEvaluationSummary SET
                avg_subject_knowledge = ?, avg_communication_effectiveness = ?, avg_communication_clarity = ?,
                avg_engagement = ?, avg_participation = ?, avg_responsiveness_approachability = ?, avg_responsiveness_effectiveness = ?,
                avg_punctuality = ?, avg_preparedness = ?, avg_critical_thinking = ?, total_feedback_count = ?, last_updated = NOW()
            WHERE feedback_id = ?
        `;

        await db.query(updateQuery, [
            updatedData.avg_subject_knowledge,
            updatedData.avg_communication_effectiveness,
            updatedData.avg_communication_clarity,
            updatedData.avg_engagement,
            updatedData.avg_participation,
            updatedData.avg_responsiveness_approachability,
            updatedData.avg_responsiveness_effectiveness,
            updatedData.avg_punctuality,
            updatedData.avg_preparedness,
            updatedData.avg_critical_thinking,
            updatedData.total_feedback_count,
            feedback_id
        ]);

        res.json({ success: true, message: 'Feedback updated successfully', data: updatedData });
    } catch (err) {
        console.error('Error updating feedback:', err);
        res.status(500).json({ success: false, message: 'Error updating feedback' });
    }
});

// Remove sentiment import as it is no longer needed
// const Sentiment = require('sentiment');


app.get('/api/fetch-feedbacks', async (req, res) => {
    const db = await getDbConnection();

    const query = `SELECT 
    tes.*, 
    t.teacher_name, 
    s.name
FROM 
    teacherevaluationsummary tes
INNER JOIN 
    teachers t ON tes.teacher_id = t.teacher_id
INNER JOIN 
    subjects s ON tes.subject_id = s.subject_id;
`;
    

    const result = await db.query(query);

    const rows = result;
    res.json(rows);
})

app.post('/api/fetchFeedback', async (req, res) => {
    const db = await getDbConnection();

    try {
        const { feedback_id } = req.body;

        const sql = `
            SELECT avg_subject_knowledge, avg_communication_effectiveness, avg_communication_clarity,
                   avg_engagement, avg_participation, avg_responsiveness_approachability, avg_responsiveness_effectiveness,
                   avg_punctuality, avg_preparedness, avg_critical_thinking, total_feedback_count, last_updated
            FROM TeacherEvaluationSummary
            WHERE feedback_id = ?
        `;

        const [results] = await db.query(sql, [feedback_id]);

        // Create an array to store parameter ratings
        // console.log(results[0]);
        const ratings = [];

        if (results[0]) {
            // Push each parameter score into the ratings array
            ratings.push({
                parameter: "avg_subject_knowledge",
                rating: results[0].avg_subject_knowledge,
            });
            ratings.push({
                parameter: "avg_communication_effectiveness",
                rating: results[0].avg_communication_effectiveness,
            });
            ratings.push({
                parameter: "avg_communication_clarity",
                rating: results[0].avg_communication_clarity,
            });
            ratings.push({
                parameter: "avg_engagement",
                rating: results[0].avg_engagement,
            });
            ratings.push({
                parameter: "avg_participation",
                rating: results[0].avg_participation,
            });
            ratings.push({
                parameter: "avg_responsiveness_approachability",
                rating: results[0].avg_responsiveness_approachability,
            });
            ratings.push({
                parameter: "avg_responsiveness_effectiveness",
                rating: results[0].avg_responsiveness_effectiveness,
            });
            ratings.push({
                parameter: "avg_punctuality",
                rating: results[0].avg_punctuality,
            });
            ratings.push({
                parameter: "avg_preparedness",
                rating: results[0].avg_preparedness,
            });
            ratings.push({
                parameter: "avg_critical_thinking",
                rating: results[0].avg_critical_thinking,
            });

            // Prepare the final response object
            const responseData = {
                ...results[0],
                ratings: ratings, // Include the ratings array in the response
            };

            res.json(responseData); // Return the updated response as JSON
        } else {
            res.json({ error: "No feedback data available for this teacher." });
        }
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
});


app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret', // Provide a fallback for testing
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to `true` if using HTTPS
}));




// Tanpreet's code 

app.get('/api/students', async (req, res) => {
    const db = await getDbConnection();

    const { branch, semester } = req.query;

    // console.log(branch,semester[0]);

    try {
        // Execute the query and log the result
        const result = await db.query(
            'SELECT * FROM students WHERE department = ? AND semester = ?',
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

// Nodemailer email function
const sendEmail = async (toEmail, link) => {
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
const sendFeedbackLinks = async (feedbackid, students, subject, teacher) => {
    const expiryTime = Date.now() + 60 * 60 * 1000;
    students.forEach((student) => {
        const feedbackLink = `http://localhost:3000/feedbackForm?feedbackid=${encodeURIComponent(feedbackid)}&name=${encodeURIComponent(student.name)}&subject=${encodeURIComponent(subject)}&teacher=${encodeURIComponent(teacher)}&expiryTime=${expiryTime}`;
        if (student.email) {
            // Send feedback link via email
            console.log(student.email);
            sendEmail(student.email, feedbackLink);
        }
    });
};

// Endpoint to trigger sending feedback links
app.post('/send-feedback-link', async (req, res) => {
    const db = await getDbConnection();

    const { feedbackid, students, subject, teacher } = req.body;  // Expecting an array of students with email or phone and token

    try {
        await sendFeedbackLinks(feedbackid, students, subject, teacher);
        res.status(200).json({ message: 'Feedback links sent to selected students' });
    } catch (error) {
        console.error('Error sending feedback links:', error);
        res.status(500).json({ message: 'Error sending feedback links', error });
    }
});

app.post('/admin-login', async (req, res) => {
    try {
        const db = await getDbConnection();
        const { username, password } = req.body;

        const [result] = await db.query(
            'SELECT * FROM admin WHERE username = ? AND password = ?',
            [username, password]
        );
        console.log(result);

        if (result.length > 0) {
           
            req.session.isAdmin = true; // Store admin status in session
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/admin-logout',adminAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

  app.post('/api/add-new-teacher',async(req,res)=>{
    const db = await getDbConnection();

    const {newTeacher,branch} = req.body;

    await db.query('START TRANSACTION');

// Insert into the `teachers` table with parameterized value
const result = await db.query(
    'INSERT INTO teachers (teacher_name) VALUES (?)',
    [newTeacher]
);

// Retrieve the last inserted ID
const teacherId = result[0].insertId;

let data;

for(let i=0;i<branch.length;i++)
{
    data = await db.query(
        'INSERT INTO teacher_branch (teacher_id, branch_id) VALUES (?, ?)',
        [teacherId, branch[i]]
    );
}

// Commit the transaction
await db.query('COMMIT');

if(data)
    {
        res.status(200).json(data);
    }
    

})


app.post('/api/add-brach-semester-subject', async(req,res)=>{
    const db = await getDbConnection();
    const {newbranch,semester,subjectid,subject} = req.body;


    const subjectresult = await db.query(
        `INSERT INTO subjects (subject_id,name) VALUES (?,?)`,
        [subjectid,subject]
    );


    const data = await db.query(
        `SELECT branch_id FROM branches WHERE name = ?`,
        [newbranch]
    );

    let branchresult;
    let branchid;
    if(data[0].length > 0)
    {
        branchid = data[0][0].branch_id;

    }
    else{
        branchresult = await db.query(
            `INSERT INTO branches (name) VALUES (?)`,
            [newbranch]
        );

        branchid = branchresult[0].insertId;
    }
    
    const result = await db.query(
        `INSERT INTO branch_semester_subject (branch_id, semester_id, subject_id) VALUES (?, ?, ?)`,
        [branchid,semester,subjectid]
    )
    
    if(result)
        {
          res.status(200).json(result);
        }

})


  app.get('/api/fetch-branches', async (req, res) => {
    const db = await getDbConnection();

    
    const result = await db.query(
        `SELECT * FROM branches`);
      if(result)
      {
        res.status(200).json(result);
      }
  });
  
  // fetch teachers 
  app.post('/fetch-teacher', async (req, res) => {
    const db = await getDbConnection();

    const { branch} = req.body; 

    const result = await db.query(
        'SELECT t.teacher_id, t.teacher_name FROM teachers t INNER JOIN teacher_branch tb ON t.teacher_id = tb.teacher_id INNER JOIN branches b ON tb.branch_id = b.branch_id WHERE b.name = ?',
        [branch]
    );
    if (result) {
        res.status(200).json(result);
    }
});


app.post('/fetch-subjects', async (req, res) => {
    const db = await getDbConnection();
    const { branch,semester} = req.body;
    
    const result = await db.query(
        'SELECT s.subject_id, s.name FROM subjects s INNER JOIN branch_semester_subject bss ON s.subject_id = bss.subject_id INNER JOIN branches b ON bss.branch_id = b.branch_id INNER JOIN semesters sem ON bss.semester_id = sem.semester_id WHERE b.name = ? AND sem.name = ?',
        [branch, semester]);
    if (result) {
        res.status(200).json(result);
    }
});



// End of Tanpreet's code 

// Start the server
app.listen(port, () => {

    console.log(`Server is running at http://localhost:${port}`);
});
