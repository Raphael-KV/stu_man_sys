import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/students`;

function App() {
  const [students, setStudents] = useState([]);

  // State to hold form text inputs
  const [formData, setFormData] = useState({
    name: '', course: '', year: '', dob: '', email: '', mobile_number: '', gender: '', address: ''
  });

  // State specifically for the uploaded file
  const [photo, setPhoto] = useState(null);

  // Load students when the app opens
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data.data); // Grabbing the 'data' array we sent from the backend
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // We must use FormData because we are sending a file alongside text
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });

    if (photo) {
      submitData.append('photo', photo);
    }

    try {
      await axios.post(API_URL, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Refresh the list and clear the form
      fetchStudents();
      setFormData({ name: '', course: '', year: '', dob: '', email: '', mobile_number: '', gender: '', address: '' });
      setPhoto(null);
      // Reset the file input visually
      document.getElementById('photoInput').value = '';
    } catch (error) {
      console.error('Error adding student', error);
      alert('Failed to add student. Check console for details.');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to drop this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student', error);
      }
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">Student Management System</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Course</label>
              <input type="text" name="course" className="form-control" value={formData.course} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Year (e.g., 2026)</label>
              <input type="number" name="year" className="form-control" value={formData.year} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="text" name="mobile_number" className="form-control" value={formData.mobile_number} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" className="form-control" value={formData.gender} onChange={handleInputChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" className="form-control" value={formData.address} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Student Photo</label>
              <input type="file" id="photoInput" name="photo" className="form-control" onChange={handleFileChange} accept="image/*" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Add Student</button>
        </form>
      </div>

      <div className="card table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Adm No.</th>
              <th>Name</th>
              <th>Course</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.photo_url ? (
                    <img src={`${BASE_URL}${student.photo_url}`} alt={student.name} className="student-photo" />
                  ) : (
                    'No Photo'
                  )}
                </td>
                <td>{student.admission_number}</td>
                <td>{student.name}</td>
                <td>{student.course} ({student.year})</td>
                <td>{student.email}</td>
                <td>{student.mobile_number}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Drop</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No students found. Add one above!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;