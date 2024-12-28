import React, { useState } from 'react';
import AdminSideBar from './../../components/AdminSideBar'; // Assuming you have the AdminSideBar component

// Styles
const styles = {
  pageLayout: {
    display: 'flex', // Sidebar + Content
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: '#f4f4f4', // Light gray for the background
    height: '100vh',
    overflowY: 'auto',
  },
  section: {
    backgroundColor: '#ffffff',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    backgroundColor: '#3f51b5',
    color: '#ffffff',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

const UserManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [classToAdd, setClassToAdd] = useState('');
  const [teacherToAdd, setTeacherToAdd] = useState('');
  const [studentToAdd, setStudentToAdd] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [teacherAllocation, setTeacherAllocation] = useState({});

  // Add Teacher
  const handleAddTeacher = () => {
    if (teacherToAdd.trim()) {
      setTeachers([...teachers, teacherToAdd]);
      setTeacherToAdd('');
    }
  };

  // Add Class
  const handleAddClass = () => {
    if (classToAdd.trim()) {
      setClasses([...classes, classToAdd]);
      setClassToAdd('');
    }
  };

  // Add Student to a Class
  const handleAddStudent = () => {
    if (studentToAdd.trim() && selectedClass) {
      const newStudent = { name: studentToAdd, className: selectedClass };
      setStudents([...students, newStudent]);
      setStudentToAdd('');
    }
  };

  // Allocate Teacher to a Class
  const handleAllocateTeacher = (className, teacher) => {
    setTeacherAllocation({ ...teacherAllocation, [className]: teacher });
  };

  return (
    <div style={styles.pageLayout}>
      <AdminSideBar />
      <div style={styles.mainContent}>
        <h1>User Management</h1>

        {/* Add Teacher Section */}
        <div style={styles.section}>
          <h2>Add Teacher</h2>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter teacher's name"
              value={teacherToAdd}
              onChange={(e) => setTeacherToAdd(e.target.value)}
            />
            <button style={styles.button} onClick={handleAddTeacher}>
              Add Teacher
            </button>
          </form>
          <h3>Teachers List</h3>
          <ul>
            {teachers.map((teacher, index) => (
              <li key={index}>{teacher}</li>
            ))}
          </ul>
        </div>

        {/* Add Class Section */}
        <div style={styles.section}>
          <h2>Add Class</h2>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter class name"
              value={classToAdd}
              onChange={(e) => setClassToAdd(e.target.value)}
            />
            <button style={styles.button} onClick={handleAddClass}>
              Add Class
            </button>
          </form>
          <h3>Classes List</h3>
          <ul>
            {classes.map((className, index) => (
              <li key={index}>{className}</li>
            ))}
          </ul>
        </div>

        {/* Add Student Section */}
        <div style={styles.section}>
          <h2>Add Student</h2>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <select
              style={styles.input}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter student's name"
              value={studentToAdd}
              onChange={(e) => setStudentToAdd(e.target.value)}
            />
            <button style={styles.button} onClick={handleAddStudent}>
              Add Student
            </button>
          </form>
          <h3>Students List</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.className}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Allocate Teacher Section */}
        <div style={styles.section}>
          <h2>Allocate Teacher</h2>
          {classes.map((className, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>{className}</strong>
              <select
                style={styles.input}
                value={teacherAllocation[className] || ''}
                onChange={(e) => handleAllocateTeacher(className, e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
