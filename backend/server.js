// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Makes the photo folder visible to the frontend

// Connect to Supabase PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required by Supabase to connect securely
});

// Configure Multer for Photo Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Saves files to the /uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renames file to avoid duplicates
    }
});
const upload = multer({ storage: storage });

// Test Route to make sure it works
app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: "Connected to Supabase successfully!", time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: "Database connection failed", details: err.message });
    }
});

// Helper: Auto-generates the unique Admission Number required by the assessment
const generateAdmissionNumber = () => {
    return 'ADM' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);
};

// 1. POST: Add a new student
app.post('/api/students', upload.single('photo'), async (req, res) => {
    try {
        const { name, course, year, dob, email, mobile_number, gender, address } = req.body;

        // If a photo was uploaded, save the path. Otherwise, set as null.
        const photo_url = req.file ? `/uploads/${req.file.filename}` : null;
        const admission_number = generateAdmissionNumber();

        const query = `
            INSERT INTO students (admission_number, name, course, year, dob, email, mobile_number, gender, address, photo_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
        `;
        const values = [admission_number, name, course, year, dob, email, mobile_number, gender, address, photo_url];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 2. GET: Fetch all students
app.get('/api/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
        // Sending back as an object with a "data" array
        res.json({ data: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. DELETE: Drop a student
app.delete('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));