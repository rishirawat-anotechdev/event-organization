import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material'
import { Email, Lock } from '@mui/icons-material'
import API from '../API/api'

import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/authSlice'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCloseSnackbar = () => setOpenSnackbar(false)

  const handleLogin = async () => {
    try {
      const response = await API.post('/auth/login', { email, password })

      setErrorMessage(response.data.message)
      setOpenSnackbar(true)
  

      const { token, user } = response.data
      dispatch(loginSuccess({ token, user, isAdmin: user.isAdmin }))

      if (response.status === 200) {
        navigate('/admin/dashboard')
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong')
      setOpenSnackbar(true)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Box
        sx={{
          padding: '40px',
          borderRadius: '10px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '400px'
        }}
      >
        <TextField
          label='Email'
          type='email'
          variant='outlined'
          value={email}
          onChange={e => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Email />
              </InputAdornment>
            )
          }}
          sx={{
            mb: 2,
            width: '100%',
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: '#503066'
            }
          }}
        />

        <TextField
          label='Password'
          type='password'
          variant='outlined'
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock />
              </InputAdornment>
            )
          }}
          sx={{
            mb: 2,
            width: '100%',
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: '#503066'
            }
          }}
        />

        <Button
          variant='contained'
          onClick={handleLogin}
          sx={{
            backgroundColor: '#503066',
            '&:hover': {
              backgroundColor: '#684080'
            },
            width: '100%'
          }}
        >
          Login
        </Button>

        {/* Snackbar for success or error messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={
              errorMessage === 'Admin logged in successfully'
                ? 'success'
                : 'error'
            }
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

export default LoginPage
