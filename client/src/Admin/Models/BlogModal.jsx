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
} from '@mui/material'
import API from '../../API/api'

const BlogModal = () => {
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [image, setImage] = useState(null)
  const [id, setId] = useState('')
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState('')

  const loaderColors = {
    add: '#e65100',
    update: '#2e8d30',
    delete: '#c62828'
  }

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await API.get('/blogs')
      setBlogs(response.data)
     
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const handleAdd = async () => {
    setAction('add')
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('videoUrl', videoUrl)
    if (image) formData.append('image', image)

    try {
      const response = await API.post('/blogs', formData)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchBlogs()
    } catch (error) {
      console.error('Error adding blog:', error)
      setMessage('Error adding blog')
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
    formData.append('videoUrl', videoUrl)
    if (image) formData.append('image', image)

    try {
      const response = await API.put(`/blogs/${id}`, formData)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchBlogs()
    } catch (error) {
      console.error('Error updating blog:', error)
      setMessage('Error updating blog')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setAction('delete')
    setLoading(true)
    try {
      const response = await API.delete(`/blogs/${id}`)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      setMessage('Error deleting blog')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const clearFields = () => {
    setTitle('')
    setVideoUrl('')
    setImage(null)
    setId('')
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <Box sx={{ paddingX: 2, py: 3, position: 'relative' }}>
      <Typography variant='h4' gutterBottom sx={{ whiteSpace: 'nowrap' }}>
        Blog Management
      </Typography>

      {/* Displaying the List of Blogs */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h6'>Existing Blogs:</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {blogs.map(blog => (
            <Grid item xs={12} sm={8} md={4} key={blog._id}>
              <Card sx={{ overflowX: 'auto' }}>
                <CardContent>
                  <Typography variant='h5' sx={{ whiteSpace: 'nowrap' }}>
                    {blog.title}
                  </Typography>
                  <Typography variant='body2'>Blog ID: {blog._id}</Typography>
                  <Typography variant='body2'>
                    Video URL: {blog.videoUrl}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Form to Add/Update Blogs */}
      <TextField
        label='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Video URL'
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
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
  )
}

export default BlogModal
