import React, { useState } from 'react';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complaint submitted:', complaint);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Submit a Complaint</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Describe your issue"
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh', // Centers the form vertically
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    width: '50%', // Smaller width for the container
    margin: '0 auto', // Center the container
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Adding shadow for better visual
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Enhanced text color
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  textarea: {
    width: '100%',
    height: '80px', // Smaller height for textarea
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ComplaintForm;
