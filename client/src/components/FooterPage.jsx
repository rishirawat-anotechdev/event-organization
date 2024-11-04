// Footer.js
import React from 'react';
import { Grid, Box, Typography, Divider, Link } from '@mui/material';
import { styled } from '@mui/system';
import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";
import { useSelector } from 'react-redux';
// Example placeholder images (replace with real images if needed)
const images = [
  one,
  two,
  three,
  one,
  two,
  three,
];

// Styled component for image
const GalleryImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '4px',
});

const Footer = () => {
   
  return (
    <Box  sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4, md: 5 },
        backgroundColor: '#000', 
        textAlign: 'center',
        color: '#fff' 
      }}>
      <Divider sx={{ borderColor: '#444', mb: 3,}} />

      <Grid container spacing={2} justifyContent="space-between">
        {/* Company Info Section */}
        <Grid item xs={12} md={4} sx={{textAlign:'left'}}>
          <Typography variant="h6" gutterBottom>
            Ano Tech Events Events
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, textAlign:'left' }}>
            From the moment our company was founded, we have helped our clients
            find exceptional solutions for <b>their businesses.</b>
          </Typography>
        </Grid>

        {/* Contact Info Section */}
        <Grid item xs={12} md={4} sx={{textAlign:'left'}}>
          <Typography variant="h6" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body2">
            #Gaur City, Noida Sector 4
            UttarPardesh 560020
          </Typography>
          <Typography variant="body2" sx={{ my: 1 }}>
            +91 xxx xxxx xxxx
          </Typography>
          <Link href="mailto:info@dreamcraft.co.in" color="inherit" underline="hover">
            info@rawattech04.co.in
          </Link>
        </Grid>

        {/* Gallery Section */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            {images.map((img, index) => (
              <Grid item xs={4} key={index}>
                <GalleryImage src={img} alt={`Gallery ${index + 1}`} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: '#444', my: 3 }} />

      {/* Footer Copyright Section */}
      <Typography variant="body2" align="center">
        © 2024 AnoTech Events. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
