# Student Management System (Frontend Mockup)

## How to Run Locally

1. Clone this repository to your local machine.
2. Open your terminal in the project directory.
3. Run `npm install` to install all necessary dependencies.
4. Run `npm run dev` to start the local development server.
5. Open the provided `localhost` link in your web browser.

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