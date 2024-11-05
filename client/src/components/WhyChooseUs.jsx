import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import Tilt from 'react-parallax-tilt'; 
import { useSelector } from 'react-redux';
import { Calendar, CreditCard, MapPin, LayoutList } from 'lucide-react';
import '@fontsource/roboto';  
import '@fontsource/poppins';


const cardData = [
  { 
    id: 1, 
    title: 'MULTIPLE EVENTS', 
    description: 'Managing diverse events with precision and ease, from meetings.',
    icon: <Calendar size={60} />,
    fontFamily: 'Roboto'  // Use Roboto font for this card
  },
  { 
    id: 2, 
    title: 'EVENT MANAGEMENT', 
    description: 'Handling all logistics and vendors to deliver flawless events.',
    icon: <LayoutList size={60} />,
    fontFamily: 'Poppins'  // Use Poppins font for this card
  },
  { 
    id: 3, 
    title: 'CREDIT CARD PAYMENT', 
    description: 'Offering secure credit card payments with multiple gateway options.',
    icon: <CreditCard size={60} />,
    fontFamily: 'Roboto'  // Use Roboto font for this card
  },
  { 
    id: 4, 
    title: 'LOCATION MANAGEMENT', 
    description: 'Finding and managing the perfect venue for your event’s needs.',
    icon: <MapPin size={60} />,
    fontFamily: 'Poppins'  // Use Poppins font for this card
  },
];




const WhyChooseUs = () => {
  const isDarkMode = useSelector(state => state.darkMode)

 
  return (
    
    <Box sx={{ 
      px: { xs: 2, sm: 4, md: 8 },  
      py: { xs: 2, sm: 4, md: 5 }, 
      textAlign: 'center', 
      backgroundColor: isDarkMode ? 'grey.900' : '#300843' 
    }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2, color: '#fff', fontSize:"50px", mt:{sm:20,xs:20, md:5} }}>
        WHY CHOOSE <span style={{ color: '#E91E63', fontSize:"60px" }}>US</span>?
      </Typography>
      <Box
        sx={{
          width: '60px',
          height: '4px',
          backgroundColor: '#E91E63',
          margin: '0 auto 30px',
        }}
      />

      <Grid container spacing={3} justifyContent="center" sx={{ mt:5}}>
        {cardData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1} transitionSpeed={100}>
              <Paper
                sx={{
                  paddingX: 5,
                  paddingY:9,
                  textAlign: 'left',
                  borderRadius: 2,
                  backgroundColor: isDarkMode ? 'grey.800' : '#f5f5f5',
                  color: isDarkMode ? '#fff' : '#000',
                  transition: 'transform 300ms ease, background-color 300ms ease',
                  '&:hover': {
                    transform: 'scale(1)',
                    backgroundColor: isDarkMode ? 'grey.700' : '#e0e0e0',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                  <Box sx={{ 
                    fontSize: '10px', 
                    color:'#E91E63'
                  }}>
                    {item?.icon}
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', whiteSpace:'nowrap' }}>
                  {item?.title}
                </Typography>
                <Typography variant="body2"
                sx={{ 
                  fontSize: '16px', 
                  fontStyle: 'italic', 
                  lineHeight: '1.5', 
                  fontFamily: item.fontFamily 
                }}
                >{item?.description}</Typography>
              </Paper>
            </Tilt>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyChooseUs;
