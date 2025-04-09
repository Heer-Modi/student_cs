import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const ViewDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/documents/my-documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(res.data.documents || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (docId, docName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, authorization denied');
        return;
      }
      const response = await axios.get(`/api/documents/download/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', docName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="h5" sx={{ color: '#f6d673', mb: 1 }}>
        Available Documents
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : documents.length === 0 ? (
        <Typography>No documents available.</Typography>
      ) : (
        documents.map((doc) => (
          <Card
            key={doc._id}
            sx={{
              backgroundColor: '#f6d673',
              color: '#10184b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': { backgroundColor: '#e3e3e3' },
            }}
          >
            <CardContent>
              <Typography variant="h6">{doc.title}</Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {doc.description}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              onClick={() => handleDownload(doc._id, doc.title)}
              sx={{ backgroundColor: '#54se85', alignSelf: 'center', mr: 2 }}
            >
              Download
            </Button>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ViewDocuments;
