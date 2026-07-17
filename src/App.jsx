import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ name: '', course: '', email: '' });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      ...formData,
      id: Date.now(),
      admissionNo: `STU-${Math.floor(Math.random() * 10000)}`
    };
    setStudents([...students, newStudent]);
    setFormData({ name: '', course: '', email: '' }); // reset form
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Student Management System</h1>

      <div style={{ padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Add New Student</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <input
            required
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ padding: '8px' }}
          />
          <input
            required
            placeholder="Course"
            value={formData.course}
            onChange={(e) => setFormData({...formData, course: e.target.value})}
            style={{ padding: '8px' }}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Student
          </button>
        </form>
      </div>

      <h3>Student List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px' }}>Admission No</th>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="5" style={{ padding: '10px', textAlign: 'center' }}>No students added yet.</td></tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}><strong>{student.admissionNo}</strong></td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={() => deleteStudent(student.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Drop
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App