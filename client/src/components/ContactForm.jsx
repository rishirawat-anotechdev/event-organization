import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Typography,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import MessageIcon from '@mui/icons-material/Message'
import CloseIcon from '@mui/icons-material/Close'
import { MessageSquareShare } from 'lucide-react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Pencil } from 'lucide-react'
import API from "../API/api"

const ContactForm = ({ open, handleClose }) => {
 
  const [preferredDate, setPreferredDate] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    contact_number: '',
    email: '',
    message: ''
  })
  const [showButton, setShowButton] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' })

  const handleFieldFocus = () => setShowButton(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const postMessage = async () => {
    try {
      const response = await API.post('/message', {
        ...formData,
       
        preferred_date: preferredDate
      })
      setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' })
      handleClose()
       setFormData({
        name: '',
        contact_number: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending message:', error)
      setSnackbar({ open: true, message: 'Error sending message', severity: 'error' })
    }
  }

  const customTheme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E91E63',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E91E63',
            },
            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: '#000',
            },
            '&:hover .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: '#E91E63',
            },
            '&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: '#E91E63',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#000',
            '&:hover': {
              color: '#E91E63',
            },
            '&.Mui-focused': {
              color: '#E91E63',
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={customTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={open} onClose={handleClose}>
          <IconButton
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogTitle style={{ textAlign: 'center' }}>
            <MessageSquareShare
              size={50}
              style={{
                color: '#E91E63',
                border: '2px solid #E91E63',
                borderRadius: '50%',
                padding: 2,
                backgroundColor: '#fce4ec',
              }}
            />
            <Typography
              style={{
                marginTop: 10,
                fontSize: '1.2rem',
                fontWeight: '500',
                color: '#E91E63',
              }}
            >
              Your specific needs, our tailored solutions.
            </Typography>
          </DialogTitle>

          <DialogTitle style={{ textAlign: 'center' }}>
            Free 30-min Expert Strategy Session
          </DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={handleFieldFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Pencil />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              label="Contact Number"
              fullWidth
              variant="outlined"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleInputChange}
              onFocus={handleFieldFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleFieldFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <DatePicker
              label="Preferred Date"
              value={preferredDate}
              onChange={(newValue) => setPreferredDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TextField
              margin="dense"
              label="Message"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onFocus={handleFieldFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MessageIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>

          {showButton && (
            <DialogActions style={{ justifyContent: 'flex-start', marginLeft: '16px' }}>
              <Button
                variant="outlined"
                onClick={postMessage}
                sx={{
                  color: '#E91E63',
                  borderColor: '#E91E63',
                  '&:hover': {
                    bgcolor: '#E91E63',
                    color: '#fff',
                    borderColor: '#E91E63',
                  },
                }}
              >
                Contact
              </Button>
            </DialogActions>
          )}
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default ContactForm
