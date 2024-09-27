import React from 'react';

const ComplaintView = () => {
  const complaints = [
    { id: 1, description: 'Issue with course registration' },
    { id: 2, description: 'Counseling session delay' },
  ];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrap}>
        <h2 style={styles.heading}>View Complaints</h2>
        <ul style={styles.list}>
          {complaints.map((complaint) => (
            <li key={complaint.id} style={styles.listItem}>{complaint.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensure it takes full height of the viewport
  },
  contentWrap: {
    flex: '1', // Take up all available space before the footer
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#333',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    width: '100%',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    color: '#555',
    textAlign: 'left',
  },
};

export default ComplaintView;
