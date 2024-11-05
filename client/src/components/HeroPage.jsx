import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, IconButton, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import video from '../assets/video.mp4';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';
import ContactForm from './ContactForm';
import API from '../API/api';

const HeroPage = () => {
  const isDarkMode = useSelector(state => state.darkMode);
  const [slideIndex, setSlideIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [heroPages, setHeroPages] = useState([]);

  
  const [openContactModal, setContactOpenModal] = useState(false);

  // Fetch hero pages from the API
  const fetchHeroPages = async () => {
    try {
      const response = await API.get('/hero');
   
      setHeroPages(response.data);
      if (response.data.length > 0) {
        setSlideIndex(0); 
      }
    } catch (error) {
      console.error('Error fetching hero pages:', error);
    }
  };

  
  useEffect(() => {
    fetchHeroPages();
  }, []);

  useEffect(() => {
    if (heroPages.length > 0) {
      const interval = setInterval(() => {
        setSlideIndex(prevIndex => (prevIndex + 1) % heroPages.length);
      }, 2500); 

      return () => clearInterval(interval); 
    }
  }, [heroPages]); 

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleContactOpen = () => {
    setContactOpenModal(true);
  };

  const handleContactClose = () => {
    setContactOpenModal(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 500ms',
        bgcolor: isDarkMode ? 'grey.900' : '#300843',
        color: isDarkMode ? 'grey.100' : 'white',
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Grid container spacing={4} sx={{ mb: { xs: 0, sm: 5 } }}>
        {/* Left: Text Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: { xs: 'center', md: 'start' },
            order: { xs: 2, md: 1 }
          }}
        >
          <Box
            sx={{
              width: '100%',
              px: 4,
              textAlign: { xs: 'center', md: 'start' }
            }}
          >
            {heroPages.length > 0 && (
              <>
                <Typography
                  variant='h1'
                  component='h1'
                  gutterBottom
                  sx={{ fontSize: '5rem', fontFamily: 'Playfair Display, serif' }}
                >
                   {heroPages[slideIndex].title.split(' ').slice(0, -1).join(' ')}{' '}
  <span style={{ color: '#E91E63' }}>
    {heroPages[slideIndex].title.split(' ').slice(-1)}
  </span>
                </Typography>
                <Typography variant='h6' paragraph sx={{ fontSize: '1.5rem', fontFamily: 'Vidaloka, serif' }}>
                  {heroPages[slideIndex].description}
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    mr: 2,
                    bgcolor: '#E91E63',
                    '&:hover': { bgcolor: '#C2185B' }
                  }}
                >
                  Book event
                </Button>
                <Button
                  variant='outlined'
                  sx={{
                    color: '#E91E63',
                    borderColor: '#E91E63',
                    '&:hover': {
                      bgcolor: '#E91E63',
                      color: '#fff'
                    }
                  }}
                  onClick={handleContactOpen}
                >
                  Contact
                </Button>
              </>
            )}
          </Box>
        </Grid>

        {/* Right: Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            order: { xs: 1, md: 2 },
            position: 'relative',
            height: '100vh', // Ensuring the height matches the overall container
            overflow: 'hidden' // Prevent overflow of images
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%', // Full height to match the parent
              overflow: 'hidden' // Prevent overflow of images
            }}
          >
            {heroPages.length > 0 && (
              <img
                src={heroPages[slideIndex].imageUrl}
                alt='Event'
                style={{
                  width: '100%',
                  height: '100%', // Full height
                  objectFit: 'cover', // Cover the area
                  borderRadius: '8px',
                  transition: 'transform 500ms ease',
                  transform: 'scale(1.1)'
                }}
              />
            )}
          </Box>

          {/* Video Button */}
          <Button
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              whiteSpace: 'nowrap',
              position: 'absolute',
              bottom: 10,
              left: {xs:"35%", sm:"20%",  md:"20%"},
              transform: 'translateX(-50%)',
              color: '#fff',
              bgcolor: isDarkMode ? '#212121' : '#300843',
              '&:hover': {
                bgcolor: '#E91E63',
                color: '#fff'
              }
            }}
            onClick={handleOpen}
          >
            <PlayArrowIcon sx={{ fontSize: 30 }} />
            See promotion video
          </Button>
        </Grid>
      </Grid>

      {/* Video Modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute'
        }}
      >
        <Box
          sx={{
            bgcolor: 'black',
            width: '90%',
            height: '90%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 0,
              right: 10,
              color: 'white',
              cursor: 'pointer',
              zIndex: 1221
            }}
          >
            <CloseIcon sx={{ cursor: 'pointer' }} />
          </IconButton>
          <ReactPlayer
            url={video}
            playing={true}
            controls={true}
            loop={true}
            width='100%'
            height='100%'
          />
        </Box>
      </Modal>
      <ContactForm open={openContactModal} handleClose={handleContactClose} />
    </Box>
  )
};

export default HeroPage;
