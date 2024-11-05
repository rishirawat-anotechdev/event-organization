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
  CircularProgress
} from '@mui/material'
import API from '../../API/api'

const AboutUsModal = () => {
  const [heading, setHeading] = useState('')
  const [content, setContent] = useState('')
  const [completedProjects, setCompletedProjects] = useState('')
  const [originalConcepts, setOriginalConcepts] = useState('')
  const [regularCustomers, setRegularCustomers] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [id, setId] = useState('')
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [aboutUsSection, setAboutUsSection] = useState(null)
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState('')
  const [showMore, setShowMore] = useState(false)

  const loaderColors = {
    add: '#e65100',
    update: '#2e8d30',
    delete: '#c62828'
  }

  // Fetch About Us section
  const fetchAboutUsSection = async () => {
    try {
      const response = await API.get('/aboutUs')
      setAboutUsSection(response.data)
      setHeading(response.data.heading)
      setContent(response.data.content)
      setCompletedProjects(response.data.completedProjects)
      setOriginalConcepts(response.data.originalConcepts)
      setRegularCustomers(response.data.regularCustomers)
      setYearsOfExperience(response.data.yearsOfExperience)
      setShowMore(false) 
    } catch (error) {
      console.error('Error fetching About Us section:', error)
    }
  }

  const handleAdd = async () => {
    setAction('add')
    setLoading(true)

    const formData = {
      heading,
      content,
      completedProjects,
      originalConcepts,
      regularCustomers,
      yearsOfExperience,
    }

    try {
      const response = await API.post('/aboutUs', formData)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchAboutUsSection()
    } catch (error) {
      console.error('Error adding About Us section:', error)
      setMessage('Error adding About Us section')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setAction('update')
    setLoading(true)

    const formData = {
      heading,
      content,
      completedProjects,
      originalConcepts,
      regularCustomers,
      yearsOfExperience,
    }

    try {
      const response = await API.put(`/aboutUs`, formData)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchAboutUsSection()
    } catch (error) {
      console.error('Error updating About Us section:', error)
      setMessage('Error updating About Us section')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setAction('delete')
    setLoading(true)
    try {
      const response = await API.delete(`/aboutUs/${id}`)
      setMessage(response.data.message)
      setOpenSnackbar(true)
      clearFields()
      fetchAboutUsSection()
    } catch (error) {
      console.error('Error deleting About Us section:', error)
      setMessage('Error deleting About Us section')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const clearFields = () => {
    setHeading('')
    setContent('')
    setCompletedProjects('')
    setOriginalConcepts('')
    setRegularCustomers('')
    setYearsOfExperience('')
    setId('')
    setShowMore(false)
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    fetchAboutUsSection()
  }, [])

  return (
    <Box sx={{ paddingX: 2, py: 3, position: 'relative' }}>
      <Typography variant='h4' gutterBottom>
        About Us Management
      </Typography>

      {/* Displaying the About Us Section */}
      {aboutUsSection && (
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h5'>{aboutUsSection.heading}</Typography>
                <Typography variant='body2'>
                  {showMore || aboutUsSection.content.length <= 1000
                    ? aboutUsSection.content
                    : `${aboutUsSection.content.substring(0, 1000)}...`}
                </Typography>
                {aboutUsSection.content.length > 1000 && (
                  <Button
                    variant='text'
                    onClick={() => setShowMore(!showMore)}
                    sx={{ marginTop: 1 }}
                  >
                    {showMore ? 'Show Less' : 'Show More'}
                  </Button>
                )}
                <Typography variant='body2'>Completed Projects: {aboutUsSection.completedProjects}</Typography>
                <Typography variant='body2'>Original Concepts: {aboutUsSection.originalConcepts}</Typography>
                <Typography variant='body2'>Regular Customers: {aboutUsSection.regularCustomers}</Typography>
                <Typography variant='body2'>Years of Experience: {aboutUsSection.yearsOfExperience}</Typography>
                <Typography variant='body2'>Id: {aboutUsSection._id}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Form to Add/Update About Us Section */}
      <TextField
        label='Heading'
        value={heading}
        onChange={e => setHeading(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Content (min-1000 words)'
        value={content}
        onChange={e => setContent(e.target.value)}
        fullWidth
        margin='normal'
        multiline
        rows={4}
      />
      <TextField
        label='Completed Projects'
        value={completedProjects}
        onChange={e => setCompletedProjects(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Original Concepts'
        value={originalConcepts}
        onChange={e => setOriginalConcepts(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Regular Customers'
        value={regularCustomers}
        onChange={e => setRegularCustomers(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Years of Experience'
        value={yearsOfExperience}
        onChange={e => setYearsOfExperience(e.target.value)}
        fullWidth
        margin='normal'
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

export default AboutUsModal
