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
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material'
import API from '../../API/api'

const CategoryModal = () => {
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState('')

  const loaderColors = {
    add: '#e65100',
    update: '#2e8d30',
    delete: '#c62828'
  }

  // Fetch categories on component mount
  const fetchCategories = async () => {
    try {
      const response = await API.get('/category')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleAdd = async () => {
    setAction('add')
    setLoading(true)
    const formData = { title }

    try {
      const response = await API.post('/category', formData)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchCategories()
    } catch (error) {
      console.error('Error adding category:', error)
      setMessage('Error adding category')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setAction('delete')
    setLoading(true)
    try {
      const response = await API.delete(`/category/${id}`)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
      setMessage('Error deleting category')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const clearFields = () => {
    setTitle('')
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Box sx={{ paddingX: 2, py: 3, position: 'relative' }}>
      <Typography variant='h4' gutterBottom sx={{ whiteSpace: 'nowrap' }}>
        Category Management
      </Typography>

      {/* Displaying the List of Categories */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h6'>Existing Categories:</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {categories.map(category => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <Card sx={{ overflowX: 'auto' }}>
                <CardContent>
                  <Typography variant='h5' sx={{ whiteSpace: 'nowrap' }}>
                    {category.title}
                  </Typography>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleDelete(category._id)}
                    sx={{ marginTop: 2 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Form to Add Categories */}
      {categories.length < 6 && (
        <>
          <TextField
            label='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            margin='normal'
          />
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
            Add Category
          </Button>
        </>
      )}

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

export default CategoryModal
