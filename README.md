# Student Management System (Frontend Mockup)

## Project Status & Architecture Plan
Given the time constraint, I prioritized building a functional frontend mockup to demonstrate state management, responsive UI, and logic skills.

The frontend is fully functional using React `useState` and `localStorage` to simulate database persistence, CRUD operations, and auto-generating unique Admission Numbers.

### Planned Backend Database (PostgreSQL)
**Table:** `students`
* `id` (Primary Key, UUID)
* `admission_no` (VARCHAR, UNIQUE, e.g., 'STU-XXXX')
* `name`, `course`, `email` (VARCHAR)
* `created_at` (TIMESTAMP)

### Planned API Endpoints (Node.js/Express)
* `POST /students` - Creates a new student and generates `admission_no`
* `GET /students` - Fetches all students for the table view
* `DELETE /students/:id` - Drops a student based on their unique ID