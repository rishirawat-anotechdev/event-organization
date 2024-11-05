import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  Grid,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import API from '../../API/api';

const FounderModal = () => {
  const [name, setName] = useState(''); 
  const [content1, setContent1] = useState(''); 
  const [content2, setContent2] = useState(''); 
  const [image, setImage] = useState(null);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contents, setContents] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('');

  const loaderColors = {
    add: '#e65100',
    update: '#2e8d30',
    delete: '#c62828'
  };

  // Fetch content on component mount
  const fetchContents = async () => {
    try {
      const response = await API.get('/founder'); 
      setContents(response.data);
     
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  const handleAdd = async () => {
    setAction('add');
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content1', content1);
    formData.append('content2', content2);
    if (image) formData.append('image', image);

    try {
      const response = await API.post('/founder', formData); 
      setMessage(response.data.message);
      setOpenSnackbar(true);
      clearFields();
      fetchContents();
    } catch (error) {
      console.error('Error adding content:', error);
      const errorMessage = error.response?.data?.message || 'Error adding content';
      setMessage(errorMessage); 
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setAction('update');
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content1', content1);
    formData.append('content2', content2);
    if (image) formData.append('image', image);

    try {
      const response = await API.put(`/founder/${id}`, formData); // Adjust API endpoint
      setMessage(response.data.message);
      setOpenSnackbar(true);
      clearFields();
      fetchContents();
    } catch (error) {
      console.error('Error updating content:', error);
      setMessage('Error updating content');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setAction('delete');
    setLoading(true);
    try {
      const response = await API.delete(`/founder/${id}`); 
      setMessage(response.data.message);
      setOpenSnackbar(true);
      clearFields();
      fetchContents();
    } catch (error) {
      console.error('Error deleting content:', error);
      setMessage('Error deleting content');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setName('');
    setContent1('');
    setContent2('');
    setImage(null);
    setId('');
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <Box sx={{ paddingX: 2, py: 3, position: 'relative' }}>
      <Typography variant='h4' gutterBottom sx={{ whiteSpace: 'nowrap' }}>
        Content Management
      </Typography>

      {/* Displaying the List of Contents */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h6'>Existing Contents:</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {contents.map(content => (
            <Grid item xs={12} sm={8} md={4} key={content._id}>
              <Card sx={{ overflowX: 'auto' }}>
                <CardContent>
                  <Typography variant='h5' sx={{ whiteSpace: 'nowrap' }}>
                    {content.name}
                  </Typography>
                  <Typography variant='body2'>Content ID: {content._id}</Typography>
                  <Typography variant='body2'>Content 1: {content.content1}</Typography>
                  <Typography variant='body2'>Content 2: {content.content2}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Form to Add/Update Contents */}
      <TextField
        label='Name'
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Content 1'
        value={content1}
        onChange={e => setContent1(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Content 2'
        value={content2}
        onChange={e => setContent2(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        type='file'
        onChange={e => setImage(e.target.files[0])}
        margin='normal'
        fullWidth
      />
      <TextField
        label='ID for Update/Delete'
        value={id}
        onChange={e => setId(e.target.value)}
        fullWidth
        margin='normal'
      />

      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
    
            <Button
              variant='contained'
              onClick={handleAdd}
              sx={{
                backgroundColor: '#e65100',
                '&:hover': {
                  backgroundColor: '#ff9800'
                }
              }}
            >
              Add
            </Button>
            <Button
              variant='contained'
              onClick={handleUpdate}
              sx={{
                backgroundColor: '#2e8d30',
                '&:hover': {
                  backgroundColor: '#2e7d32'
                }
              }}
            >
              Update
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={handleDelete}
              sx={{
                '&:hover': {
                  backgroundColor: '#c62828'
                }
              }}
            >
              Delete
            </Button>
      
      </Box>

      {/* Loader overlay with blur effect */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            mx: 'auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000
          }}
        >
          <CircularProgress sx={{ color: loaderColors[action] }} />
        </Box>
      )}

      {/* Snackbar for messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          zIndex: 1500
        }}
      />
    </Box>
  );
};

export default FounderModal;
