import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import API from '../API/api';

const EventsShowcase = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [heroPages, setHeroPages] = useState([]);

  useEffect(() => {
    fetchEventShowcases();
  }, []);

  const fetchEventShowcases = async () => {
    try {
      const response = await API.get('/showcase');
   
      
      setHeroPages(response.data);
    } catch (error) {
      console.error('Error fetching event showcases:', error);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4, md: 5 },
        backgroundColor: isDarkMode ? 'grey.900' : ''
      }}
    >
      <Typography variant="h6" color={isDarkMode ? '#fff' : 'textSecondary'} gutterBottom>
        FEATURED PROJECTS
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: '1rem', color:'#E91E63' }}
      >
        Events Showcase
      </Typography>

      <Grid container spacing={3}>
        {heroPages.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <HoverCard event={event} isDarkMode={isDarkMode} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const HoverCard = ({ event, isDarkMode }) => {
  const [hovering, setHovering] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const imageCount = event.images?.length || 0; // Use optional chaining to check for images array

  useEffect(() => {
    let interval;

    if (hovering && imageCount > 0) {
      interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
      }, 1500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [hovering, imageCount]);

  const handlePrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount);
  };

  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: 450,
        width: '100%',
        backgroundColor: isDarkMode ? '#424242' : '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setImageIndex(0);
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {imageCount > 0 && (
          <CardMedia
            component="img"
            height="200"
            image={event.images[imageIndex]}
            alt={event.title}
            sx={{
              transition: 'transform 0.5s ease',
              objectFit: 'cover',
            }}
          />
        )}

        {imageCount > 1 && (
          <>
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
          {event.title}
        </Typography>
        <Typography variant="body2" color={isDarkMode ? 'grey.300' : 'textSecondary'}>
          {event.description}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '1rem', color: isDarkMode ? '#ffffff' : '#000000', position: 'absolute', bottom: 16 }}>
          Date: {new Date(event.eventDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventsShowcase;
