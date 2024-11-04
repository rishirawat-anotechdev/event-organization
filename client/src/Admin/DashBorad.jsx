import React, { useState } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Modal,
  Typography,
} from '@mui/material'
import { Edit } from '@mui/icons-material' 
import HeroSection from './Models/HeroSection'
import VideoModel from './Models/VideoModel'
import EventShowCaseModal from './Models/EventShowCaseModal'
import AboutUsModal from './Models/AboutUsModal'
import EventsSeoModel from './Models/EventsSeoModel'
import BlogModal from './Models/BlogModal'
import FoundersSeoModel from './Models/FoundersSeoModel'
import CloseIcon from '@mui/icons-material/Close'
import CategoryModal from './Models/CategoryModal'
const DashBoard = () => {
  const [open, setOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const handleOpen = component => {
    setModalContent(component)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setModalContent(null)
  }

  // Data for each SEO section with corresponding component
  const data = [
    { id: 1, name: 'Hero Section SEO', component: <HeroSection /> },
    { id: 2, name: 'Video SEO', component: <VideoModel /> },
    { id: 3, name: 'Event Show Case SEO', component: <EventShowCaseModal /> },
    { id: 4, name: 'About Us SEO', component: <AboutUsModal /> },
    { id: 5, name: 'Event SEO', component: <EventsSeoModel /> },
    { id: 6, name: 'Category SEO', component: <CategoryModal /> },
    { id: 7, name: 'Blog SEO', component: <BlogModal /> },
    { id: 8, name: 'Founders SEO', component: <FoundersSeoModel /> }
  ]

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={2}>
        {data.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': { boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }
              }}
              onClick={() => handleOpen(item.component)}
            >
              <Typography variant='h6'>{item.name}</Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px'
                }}
              >
                {/* Edit Icon */}
                <Tooltip title='Edit'>
                  <IconButton
                    onClick={e => {
                      e.stopPropagation()
                      handleOpen(item.component)
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          {modalContent}

          {/* Close button */}
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <IconButton sx={{ border: 1 }} onClick={handleClose} color='error'>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default DashBoard
