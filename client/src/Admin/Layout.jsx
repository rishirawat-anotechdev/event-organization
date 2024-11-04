import React, { Suspense, useContext, useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

  Avatar,
  Divider,

  CircularProgress,
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'


import {  Outlet, useNavigate } from 'react-router-dom'


import { Dashboard, Message } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../redux/authSlice'

const navLinks = [
  {
    text: 'Dashboard',
    icon: <Dashboard size={30} />,
    link: '/admin/dashboard',
    iconColor: '#f39c12'
  }, // Orange
  {
    text: 'Messages',
    icon: <Message size={30} />,
    link: '/admin/messages',
    iconColor: '#1abc9c'
  } // Greenish
]

// Loading fallback for lazy loading
export const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
  >
    <CircularProgress />
  </Box>
)

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [currentRoute, setCurrentRoute] = useState('Dashboard')
  const {user} = useSelector((state) => state.auth)

 
  const drawerWidth = sidebarOpen ? 270 : 80

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleListItemClick = (index, link) => {
    setSelectedIndex(index)
    navigate(link) 
  }


  const handleLogoutBtn = () => {
    dispatch(logoutSuccess())
    navigate("/login");
  }
  const drawer = (
    <div>
      <Toolbar />
      {/* Profile section for mobile screens */}

      <Box
        display={{ xs: 'flex', sm: 'flex', justifyContent: 'center' }}
        alignItems='center'
        sx={{ mb: 0, color: 'white', mt: 5 }}
      >
        <Avatar
          alt='Profile'
          src='/path-to-image.jpg'
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        {sidebarOpen && 
        <Box display={{ xs: 'flex', sm: 'flex' }} flexDirection='column'>
        <Typography variant='body1' sx={{ mt: 1, mb: 1 }}>
          {user?.fullName}
        </Typography>
        <Typography variant='body2'>{user?.email}</Typography>
      </Box>
        }
        
      </Box>

      <Divider sx={{ mt: 2 }} />
      <List sx={{ overflowX: 'none', mt: 2 }}>
        {navLinks.map((link, index) => (
          <ListItem
            button
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, link.link)}
            sx={{
              color: 'white',
              mt: 1,
              backgroundColor: selectedIndex === index ? '#ff3465' : 'inherit',
              '&:hover': {
                backgroundColor: '#ff3465'
              },
              cursor:"pointer"
            }}
          >
            <ListItemIcon
              sx={{ minWidth: sidebarOpen ? 60 : 70, color: link.iconColor }}
            >
              {link.icon}
            </ListItemIcon>
            {/* Ensure text visibility when sidebar is open */}
            {sidebarOpen && (
              <ListItemText
                primary={link.text}
                sx={{
                  color: 'white',
                  fontSize: { xs: '16px', sm: '20px' },
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </div>
  )

  // Routing logic
  useEffect(() => {
    // Get the current path and replace '/admin/' with 'admin / '
    let path = window.location.pathname.replace('/admin/', 'admin / ')

    // Remove hyphens and replace them with spaces
    path = path.replace(/-/g, ' ')

    // Convert the path to uppercase
    const uppercaseRoute =
      path.charAt(0).toUpperCase() + path.slice(1).toUpperCase()

   
    setCurrentRoute(uppercaseRoute || 'DASHBOARD')
  }, [window.location.pathname])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ zIndex: theme => theme.zIndex.drawer + 1, bgcolor: '#182433' }}
      >
     <Toolbar 
  sx={{ 
    height: '10vh', 
    backgroundColor: "#300843", 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <IconButton
      color='inherit'
      aria-label='open drawer'
      edge='start'
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    <IconButton
      color='inherit'
      aria-label='toggle sidebar'
      edge='start'
      onClick={handleSidebarToggle}
      sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
    >
      <MenuIcon />
    </IconButton>
 
    <span style={{ color: 'white', fontWeight: 'bold' }}>AnoTech Events</span>
  </div>

  <Button
    onClick={handleLogoutBtn}
    sx={{
      color: 'white',
      '&:hover': {
        backgroundColor: '#450A3D', 
      },
      marginLeft: 'auto', 
    }}
  >
    Logout
  </Button>
</Toolbar>
      
      </AppBar>

      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            bgcolor: '#300843',
            color: 'white',
            overflowX: 'hidden', 
            overflowY: 'auto', 
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 transparent', 
            '&::-webkit-scrollbar': {
              width: '2px' 
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#555'
              }
            }
          },
          display: { xs: 'none', sm: 'block' }
        }}
        open
      >
        {drawer}
      </Drawer>

      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: '#300843',
            color: 'white',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0px'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          }
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component='main'
        className='scrollbar-hide'
        sx={{
          backgroundColor: '#f6f8fb',
          width: { xs: '100%', sm: `calc(100vw - ${drawerWidth}px)` },
          maxWidth: { xs: '100%', sm: `calc(100vw - ${drawerWidth}px)` },
          height: { xs: 'calc(100vh - 10vh)', sm: `calc(100vh - 10vh)` },
          maxHeight: { xs: 'calc(100vh - 10vh)', sm: `calc(100vh- 10vh)` },
          overflowY: 'auto',
          mt: { xs: 12, sm: 8 },
          p: { xs: 1, sm: 2 },
          '&::-webkit-scrollbar': {
            width: '0px'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}
      >
        <Typography
          variant='h6'
          sx={{
            mb: 2,
            marginTop: {
              xs: '20px',
              sm: '25px',
              md: '1rem', 
            
            },
            fontSize: {
              xs: '1rem',
              sm: '1.25rem',
              md: '1.5rem', 
              lg: '2rem'
            }
          }}
        >
          {currentRoute}
        </Typography>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  )
}

export default Layout
