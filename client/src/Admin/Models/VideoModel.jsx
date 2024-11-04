import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  CircularProgress,
  IconButton,
  Card,
  CardContent
} from '@mui/material'
import { Delete } from '@mui/icons-material' // Delete icon
import API from '../../API/api'

const VideoModal = () => {
  const [videoFile, setVideoFile] = useState(null) // For video upload
  const [videoUrl, setVideoUrl] = useState(null) // To store the current video URL
  const [loading, setLoading] = useState(false) // Loader while uploading/deleting
  const [message, setMessage] = useState('') // Snackbar message
  const [openSnackbar, setOpenSnackbar] = useState(false) // For showing snackbar

  // Fetch the current video from the server on component mount
  const fetchVideo = async () => {
    try {
      const response = await API.get('/video')
      setVideoUrl(response.data.videoUrl)
    } catch (error) {
      console.error('Error fetching video:', error)
    }
  }

  // Handle video file selection
  const handleVideoChange = e => {
    setVideoFile(e.target.files[0])
  }

  // Upload video to the server
  const handleVideoUpload = async () => {
    if (!videoFile) {
      setMessage('Please select a video file to upload.')
      setOpenSnackbar(true)
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('video', videoFile)

    try {
      const response = await API.post('/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setMessage(response.data.message)
      setOpenSnackbar(true)
      fetchVideo() // Refresh video after upload
    } catch (error) {
      console.error('Error uploading video:', error)
      setMessage('Error uploading video.')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  // Delete video
  const handleDeleteVideo = async () => {
    setLoading(true)
    try {
      const response = await API.delete('/video')
      setMessage(response.data.message)
      setOpenSnackbar(true)
      setVideoUrl(null) 
    } catch (error) {
      console.error('Error deleting video:', error)
      setMessage('Error deleting video.')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  // Close the Snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h4' gutterBottom>
        Video Management
      </Typography>

      {/* Display current video */}
      {videoUrl ? (
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant='h6'>Current Video</Typography>
            <video width='100%' controls>
              <source src={videoUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <IconButton
              onClick={handleDeleteVideo}
              sx={{ marginTop: 1 }}
              color='error'
            >
              <Delete />
            </IconButton>
          </CardContent>
        </Card>
      ) : (
        <Typography variant='body1' color='textSecondary'>
          No video uploaded.
        </Typography>
      )}

      {/* Upload new video */}
      <Box sx={{ marginTop: 2 }}>
        <TextField type='file' onChange={handleVideoChange} fullWidth />
        <Button
          variant='contained'
          sx={{
            marginTop: 2,
            backgroundColor: '#e65100',
            '&:hover': {
              backgroundColor: '#ff9800'
            }
          }}
          onClick={handleVideoUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload Video'}
        </Button>
      </Box>

      {/* Snackbar for messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  )
}

export default VideoModal
