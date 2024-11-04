import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import gift from '../assets/gift.png';
import { useSelector } from 'react-redux';
import ContactForm from './ContactForm';

const GiftIcon = () => (
  <Box
    component="img"
    src={gift}
    alt="Gift Icon"
    sx={{
      width: { xs: '120px', md: '200px' }, 
      height: { xs: '120px', md: '200px' },
    }}
  />
);

const ContactUs = () => {
  // Get dark mode state from Redux
  const isDarkMode = useSelector((state) => state.darkMode);
  const [openModal, setOpenModal] = useState(false);
  // Define color variables based on dark or light mode
  const bgColor = isDarkMode ? '#212121' : '';  
  const textColor = isDarkMode ? '#ffffff' : '#ffffff'; 
  const highlightColor = isDarkMode ? '#f73266' : '#f73266'; 

  

  const handleOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  };
  
  return (
   <Box
   sx={{
    backgroundColor: bgColor
}}
  
   >
     <Box
      sx={{
        backgroundColor: '#3e0a57', 
        borderRadius: '30px',
        px: { xs: 2, sm: 12, md: 14 },
        py: { xs: 2, sm: 5, md: 5 },
        marginX: { xs: 2, sm: 8, md: 10 },
      }}
    >
      <Grid container spacing={4} justifyContent="space-between" alignItems="center">
        
        {/* Left Side (Gifts and Text) */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },  
            alignItems: { xs: 'center', md: 'center' },  
            justifyContent: { xs: 'center', md: 'space-between' },
            textAlign: { xs: 'center' }, 
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',  
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <GiftIcon />
            {/* Add more GiftIcons if needed */}
          </Box>

          {/* Text Section */}
          <Box sx={{ marginTop: { xs: '20px', md: '0' }, marginLeft: { md: '20px' } }}>
            <Typography
              variant="h4"
              sx={{
                marginTop: '20px',
                color: highlightColor, 
                fontWeight: 'bold',
                textAlign: { xs: 'center', md: 'left' }, 
              }}
            >
              Ready to have some fun?
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: textColor,
                fontWeight: 'bold',
                textAlign: { xs: 'center', md: 'left' }, 
              }}
            >
              Get in touch <br /> with us!
            </Typography>
          </Box>
        </Grid>

        {/* Right Side (Contact Info and Button) */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{
            textAlign: { xs: 'center' }, 
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ color: textColor, fontWeight: 'bold' }}
          >
            +61383766284
          </Typography>

          <Typography 
            sx={{ color: textColor, marginTop: '10px' }}
          >
            Monday - Friday <strong>09:00 AM - 06:00 PM</strong>
            <br />
            Saturday <strong>07:00 AM - 08:00 PM</strong>
          </Typography>

          {/* Contact Button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: highlightColor, 
              '&:hover': {
                backgroundColor: '#e91e63',
              },
              borderRadius: '20px',
              fontSize: '16px',
            }}
            onClick={handleOpen}
          >
            Contact →
          </Button>
        </Grid>
      </Grid>
    </Box>
    <ContactForm  open={openModal} handleClose={handleClose} />
   </Box>
  );
};

export default ContactUs;
