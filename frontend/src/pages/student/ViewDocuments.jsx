import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ViewDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

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
      setDownloadingId(docId);
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
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#1a365d',
            fontWeight: '600',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: '40px',
              height: '3px',
              backgroundColor: '#3182CE',
              borderRadius: '2px',
            }
          }}
        >
          Available Documents
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#3182CE' }} />
        </Box>
      ) : documents.length === 0 ? (
        <Box 
          sx={{ 
            backgroundColor: '#EBF8FF', 
            p: 3, 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#2C5282',
            border: '1px dashed #90CDF4'
          }}
        >
          <Typography>No documents available at this time.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {documents.map((doc) => (
            <Card
              key={doc._id}
              sx={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
                }
              }}
            >
              <Box sx={{ display: 'flex', borderLeft: '4px solid #3182CE' }}>
                <CardContent sx={{ p: 3, flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <DescriptionIcon sx={{ color: '#3182CE' }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#1a365d', 
                        fontWeight: '600',
                      }}
                    >
                      {doc.title}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontStyle: 'italic',
                      color: '#4A5568',
                      ml: 4
                    }}
                  >
                    {doc.description}
                  </Typography>
                </CardContent>
                
                <Box sx={{ display: 'flex', alignItems: 'center', pr: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleDownload(doc._id, doc.title)}
                    disabled={downloadingId === doc._id}
                    sx={{ 
                      backgroundColor: '#3182CE',
                      '&:hover': {
                        backgroundColor: '#2B6CB0',
                      },
                      boxShadow: '0 4px 12px rgba(49, 130, 206, 0.15)'
                    }}
                    startIcon={downloadingId === doc._id ? 
                      <CircularProgress size={20} color="inherit" /> : 
                      <FileDownloadIcon />
                    }
                  >
                    {downloadingId === doc._id ? 'Downloading...' : 'Download'}
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ViewDocuments;