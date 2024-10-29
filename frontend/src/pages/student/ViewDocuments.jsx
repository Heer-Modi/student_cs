import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

const ViewDocuments = () => {
  const documents = [
    { id: 1, name: 'Counseling Guidelines.pdf' },
    { id: 2, name: 'Career Roadmap.docx' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="h5" sx={{ color: '#f6d673', mb: 1 }}>
        Available Documents
      </Typography>
      {documents.map((doc) => (
        <Card
          key={doc.id}
          sx={{ backgroundColor: '#f6d673', color: '#10184b', '&:hover': { backgroundColor: '#a3abb2' }, display: 'flex', justifyContent: 'space-between' }}
        >
          <CardContent>
            <Typography variant="h6">{doc.name}</Typography>
          </CardContent>
          <Button variant="contained" href={`/documents/${doc.id}`} download sx={{ backgroundColor: '#54se85', alignSelf: 'center', mr: 2 }}>
            Download
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default ViewDocuments;
