import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Box,
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightlightIcon from '@mui/icons-material/Nightlight'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../redux/darkModeSlice'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {  Sparkles } from 'lucide-react'
import ContactForm from './ContactForm'
import { Link, useNavigate } from 'react-router-dom'

const HeaderPage = ({
  children,
  aboutUsRef,
  contactUsRef,
  blogRef,
  eventShowCaseRef
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode)
  const [appBarBackground, setAppBarBackground] = useState('transparent')
  const [openModal, setModalpen] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setMobileOpen(false)
  }

  const toggleDrawer = open => () => {
    setMobileOpen(open)
  }

  // Hide AppBar on scroll down, show on scroll up
  const trigger = useScrollTrigger({
    threshold: 100
  })

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    // Set background color based on scroll position
    if (currentScrollY > 50) {
      setAppBarBackground('#300843') // Set background color when scrolled down
    } else {
      setAppBarBackground('transparent') // Set background to transparent
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Toggle dark mode using Redux action
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode()) // Dispatch the toggle action
  }

  const handleLinkClick = link => {
    setActiveLink(link)

    switch (link) {
      case 'Home':
        window.scrollTo({ top: 0, behavior: 'smooth' })
        break
      case 'About us':
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Event Showcase':
        eventShowCaseRef.current.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Contact':
        contactUsRef.current.scrollIntoView({ behavior: 'smooth' })
        break
      case 'Blog':
        blogRef.current.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        break
    }
  }

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: appBarBackground,
          transition: 'background-color 0.3s ease',
          elevation: 0,
          borderBottom: 'none',
          backdropFilter: 'none',
          boxShadow: 'none'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 2rem',
            width: '100%',
            elevation: 0,
            zIndex: 1201,
            borderBottom: 'none'
          }}
        >
          {/* Logo */}
        <Link to={'/'} style={{textDecoration:'none'}}>
        <Typography variant='h6' sx={{ color: '#fff', fontWeight: 'bold' }}>
            AnoTech <Sparkles color='#E91E63' /> Events
          </Typography>
        </Link>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: '1.5rem',
                alignItems: 'center',
                flexGrow: 1,
                justifyContent: 'center'
              }}
            >
              {['Home', 'About us', 'Event Showcase', 'Blog', 'Contact'].map(
                text => (
                  <ListItem
                    key={text}
                    onClick={() => handleLinkClick(text)}
                    sx={{
                      backgroundColor: 'none',
                      color:
                        activeLink === text
                          ? '#ff3161'
                          : darkMode
                          ? '#fff'
                          : '#fff',
                      borderBottom:
                        activeLink === text ? '2px solid #ff3161' : 'none',
                      '&:hover': {
                        borderBottom: '2px solid #ff3161'
                      },
                      padding: '0 0.5rem',
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      display: { xs: 'none', sm: 'none', md: 'block' },
                      cursor: 'pointer'
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </Box>

            {/* Dark Mode Toggle Button */}
            <IconButton onClick={handleToggleDarkMode} color='inherit'>
              {darkMode ? (
                <WbSunnyIcon sx={{ color: '#666666' }} />
              ) : (
                <NightlightIcon sx={{ color: '#fff' }} />
              )}
            </IconButton>

            {/* Mobile Menu Icon */}
            <IconButton
              edge='end'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
              sx={{
                display: { md: 'none' }, // Show only on mobile
                color: '#fff'
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar for Mobile */}
      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            height: '100%',
            backgroundColor: darkMode ? '#666666' : '#300843',
            color: darkMode ? '#fff' : '#000'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem'
          }}
        >
          <Typography variant='h6' sx={{ color: darkMode ? '#fff' : '#fff' }}>
            AnoTech Events
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <ArrowForwardIcon sx={{ color: darkMode ? '#fff' : '#fff' }} />
          </IconButton>
        </Box>
        <List
          sx={{
            width: 250,
            padding: '1rem'
          }}
        >
          {['Home', 'About us', 'Event Showcase', 'Blog', 'Contact'].map(
            text => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  toggleDrawer(false)()
                  handleLinkClick(text)
                }}
                sx={{
                  color: '#fff',
                  borderBottom:
                    activeLink === text ? '2px solid #E91E63' : 'none'
                }}
              >
                <ListItemText primary={text} sx={{ cursor: 'pointer' }} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <ContactForm open={openModal} handleClose={handleClose} />

      {/* Dark mode body styling */}
      <Box
        sx={{
          mt: { xs: -14, sm: 0, md: 0 }
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default HeaderPage
