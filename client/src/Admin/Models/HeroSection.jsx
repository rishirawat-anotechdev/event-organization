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

const HeroSection = () => {
  const [title, setTitle] = useState('');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [heroPages, setHeroPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(''); 

  const loaderColors = {
    add: '#e65100',
    update: '#2e8d30',
    delete: '#c62828',
  };

  // Fetch hero pages on component mount
  const fetchHeroPages = async () => {
    try {
      const response = await API.get('/hero');
      setHeroPages(response.data);
    } catch (error) {
      console.error('Error fetching hero pages:', error);
    }
  };

  const handleAdd = async () => {
    setAction('add');
    setLoading(true); 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('heading', heading);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const response = await API.post('/hero', formData);
      setMessage(response.data.message);
      setOpenSnackbar(true);
      clearFields();
      fetchHeroPages();
    } catch (error) {
      console.error('Error adding hero page:', error);
      setMessage('Error adding hero page');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setAction('update');
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('heading', heading);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const response = await API.put(`/hero/${id}`, formData);
      setMessage(response.data.message);
      setOpenSnackbar(true);
      clearFields();
      fetchHeroPages();
    } catch (error) {
      console.error('Error updating hero page:', error);
      setMessage('Error updating hero page');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setAction('delete');
    setLoading(true);
    try {
      const response = await API.delete(`/hero/${id}`);
      setMessage(response.data.message);
      setOpenSnackbar(true);
      clearFields();
      fetchHeroPages();
    } catch (error) {
      console.error('Error deleting hero page:', error);
      setMessage('Error deleting hero page');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setTitle('');
    setHeading('');
    setDescription('');
    setImage(null);
    setId('');
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    fetchHeroPages();
  }, []);

  return (
    <Box sx={{ paddingX: 2, py: 3, position: 'relative' }}>
      <Typography variant='h4' gutterBottom sx={{ whiteSpace: 'nowrap' }}>
        Hero Section Management
      </Typography>

      {/* Displaying the List of Hero Pages */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h6'>Existing Hero Pages:</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {heroPages.map((page) => (
            <Grid item xs={12} sm={8} md={4} key={page._id}>
              <Card sx={{ overflowX: 'auto' }}>
                <CardContent>
                  <Typography variant='h5' sx={{ whiteSpace: 'nowrap' }}>
                    {page.title}
                  </Typography>
                  <Typography variant='body2'>ID: {page._id}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Form to Add/Update Hero Pages */}
      <TextField
        label='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Heading'
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        type='file'
        onChange={(e) => setImage(e.target.files[0])}
        margin='normal'
        fullWidth
      />
      <TextField
        label='ID for Update/Delete'
        value={id}
        onChange={(e) => setId(e.target.value)}
        fullWidth
        margin='normal'
      />

      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        {loading ? (
          <CircularProgress
            sx={{
              color: loaderColors[action], 
            }}
          />
        ) : (
          <>
            <Button
              variant='contained'
              onClick={handleAdd}
              sx={{
                backgroundColor: '#e65100',
                '&:hover': {
                  backgroundColor: '#ff9800',
                },
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
                  backgroundColor: '#2e7d32',
                },
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
                  backgroundColor: '#c62828',
                },
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Box>

      {/* Loader overlay with blur effect */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(5px)', 
            zIndex: 1000, 
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
          zIndex: 1500, 
        }}
      />
    </Box>
  );
};

export default HeroSection;
