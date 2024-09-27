import React from 'react';

const ViewDocuments = () => {
  const documents = [
    { id: 1, name: 'Counseling Guidelines.pdf' },
    { id: 2, name: 'Career Roadmap.docx' },
  ];

  return (
    <div>
      <h2>Available Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <a href={`/documents/${doc.id}`} download>
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewDocuments;
