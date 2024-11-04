import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  IconButton
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import API from '../../API/api'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const EventShowCase = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState(null)
  const [images, setImages] = useState([]) 
  const [id, setId] = useState('')
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [heroPages, setHeroPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState('')

  const loaderColors = {
    add: '#e65100',
    update: '#2e8d30',
    delete: '#c62828'
  }

  // Fetch event showcase pages
  const fetchEventShowcases = async () => {
    try {
      const response = await API.get('/showcase')
      setHeroPages(response.data)
    } catch (error) {
      console.error('Error fetching event showcases:', error)
    }
  }

  const handleAdd = async () => {
    setAction('add')
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('eventDate', eventDate)

    // Append multiple images to the formData
    images.forEach((image) => {
      formData.append('images', image)
    })

    try {
      const response = await API.post('/showcase', formData)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchEventShowcases()
    } catch (error) {
      console.error('Error adding showcase event:', error)
      setMessage('Error adding showcase event')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setAction('update')
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('eventDate', eventDate)

    // Append multiple images to the formData
    images.forEach((image) => {
      formData.append('images', image)
    })

    try {
      const response = await API.put(`/showcase/${id}`, formData)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchEventShowcases()
    } catch (error) {
      console.error('Error updating showcase event:', error)
      setMessage('Error updating showcase event')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setAction('delete')
    setLoading(true)
    try {
      const response = await API.delete(`/showcase/${id}`)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchEventShowcases()
    } catch (error) {
      console.error('Error deleting showcase event:', error)
      setMessage('Error deleting showcase event')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  }

  const clearFields = () => {
    setTitle('')
    setDescription('')
    setEventDate(null)
    setImages([])
    setId('')
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    fetchEventShowcases()
  }, [])

  return (
    <Box sx={{ paddingX: 2, py: 3, position: 'relative' }}>
      <Typography variant='h4' gutterBottom>
        Event Showcase Management
      </Typography>

      {/* Displaying the List of Event Showcases */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h6'>Existing Events:</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {heroPages.map(page => (
            <Grid item xs={12} sm={8} md={4} key={page._id}>
              <Card sx={{ overflowX: 'auto' }}>
                <CardContent>
                  <Typography variant='h5'>{page.title}</Typography>
                  <Typography variant='body2'>Id: {page._id}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Form to Add/Update Event Showcases */}
      <TextField
        label='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        fullWidth
        margin='normal'
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label='Event Date'
          value={eventDate}
          onChange={newValue => setEventDate(newValue)}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              margin='normal'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'gray'
                  },
                  '&:hover fieldset': {
                    borderColor: 'black'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'gray'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black'
                },

                '&.Mui-error': {
                  '& fieldset': {
                    borderColor: 'gray'
                  }
                }
              }}
            />
          )}
        />
      </LocalizationProvider>

      <TextField
        type='file'
        inputProps={{ multiple: true }} // Allow multiple files
        onChange={handleImageChange}
        margin='normal'
        fullWidth
      />
      
      {/* Image previews */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
        {images.map((image, index) => (
          <Box key={index} sx={{ position: 'relative', width: 100, height: 100 }}>
            <img
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <IconButton
              onClick={() => removeImage(index)}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

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
            '&:hover': { backgroundColor: '#ff9800' }
          }}
        >
          Add
        </Button>
        <Button
          variant='contained'
          onClick={handleUpdate}
          sx={{
            backgroundColor: '#2e8d30',
            '&:hover': { backgroundColor: '#2e7d32' }
          }}
        >
          Update
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
          sx={{ '&:hover': { backgroundColor: '#c62828' } }}
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
        sx={{ zIndex: 1500 }}
      />
    </Box>
  )
}

export default EventShowCase
