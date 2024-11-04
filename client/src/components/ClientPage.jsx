// ClientSection.js
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';  // Importing useSelector
import Group1 from "../assets/Group1.png"
import Group2 from "../assets/Group2.png"
import Group3 from "../assets/Group3.png"
import Group4 from "../assets/Group4.png"
import Group5 from "../assets/Group5.png"
import Group6 from "../assets/Group6.png"
import Group7 from "../assets/Group7.png"
import Group8 from "../assets/Group8.png"

const ClientImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: 150,
  objectFit: 'contain',
  transition: 'transform 0.3s', // Adding transition for hover effect
  '&:hover': {
    transform: 'scale(1.1)', // Scale up on hover
  },
}));

const clients = [
  { name: 'Minova', logo:Group1  },
  { name: 'Microland', logo:Group2 },
  { name: 'Cisco', logo:Group3 },
  { name: 'BigBasket', logo:Group4},
  { name: 'Flipkart', logo:Group5 },
  { name: 'Mavenir', logo:Group6 },
  { name: 'Success Gyan', logo:Group7},
  { name: 'Capital One', logo:Group8},
];

const ClientSection = () => {
  const isDarkMode = useSelector(state => state.darkMode); 

  return (
    <Box 
    sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4, md: 5 },
        backgroundColor: isDarkMode ? 'grey.900' : '', 
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ fontWeight: 'bold', color: isDarkMode ? '#E91E63' : '#E91E63', mb: 2 }}
      >
        We Have Had the Pleasure of Working with Some Clients
      </Typography>

      <Typography
        variant="subtitle1"
        textAlign="center"
        sx={{ color: isDarkMode ? '#ccc' : '#999', mb: 4 }}
      >
        FANTASTIC AND PREMIUM CLIENTS
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {clients.map((client, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box
              sx={{
                border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 120,
                transition: 'background-color 0.3s', 
                '&:hover': {
                  backgroundColor: isDarkMode ? '#1d1d1d' : '#f5f5f5', 
                },
              }}
            >
              <ClientImage src={client.logo} alt={client.name} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientSection;
