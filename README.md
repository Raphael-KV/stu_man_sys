# Student Management System

A full-stack student management application built for a technical assessment. It includes a React frontend, an Express API, and a PostgreSQL database.

## Live Links
* **Live Site:** https://raphael-submission.netlify.app/
* **API URL:** https://stu-man-sys-backend.onrender.com/

**Note for Reviewers:** The backend API is hosted on Render's free tier. Because it goes to sleep after 15 minutes of inactivity, the very first time you load the page it might take 30-50 seconds to fetch the data while the server wakes up. After that, it's instant.

## Tech Stack
* **Frontend:** React (Vite), Axios, plain CSS
* **Backend:** Node.js, Express, Multer (for image uploads)
* **Database:** PostgreSQL (via Supabase)
* **Hosting:** Netlify & Render

## Database Schema
`students` table:
* `id` (SERIAL PRIMARY KEY)
* `admission_number` (VARCHAR, UNIQUE, auto-generated)
* `name`, `course`, `email`, `mobile_number`, `gender`, `address` (VARCHAR/TEXT)
* `year` (INT)
* `dob` (DATE)
* `photo_url` (VARCHAR)
* `created_at` (TIMESTAMP)

## API Endpoints
* `GET /api/students` - Get all students
* `POST /api/students` - Add a new student (handles image upload & auto-generates admission number)
* `DELETE /api/students/:id` - Delete a student

## Local Setup

**1. Clone the repo**
```bash
git clone https://github.com/Raphael-KV/stu_man_sys.git
cd stu-man-sys
```

**2. Start the backend**
```bash
cd backend
npm install
```
*Create a `.env` file in the `backend` folder and add your own Supabase connection string:*
`DATABASE_URL=your_own_postgres_uri_here`
```bash
node server.js
```


**3. Start the frontend**
Open a new terminal window:
(inside project root)
```bash
npm install
npm run dev
```