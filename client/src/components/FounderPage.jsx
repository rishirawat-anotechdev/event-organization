import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useSelector } from 'react-redux';
import API from "../API/api";

// Dreamer Card Component
const DreamerCard = ({ person, isDarkMode }) => (
  <Box
    sx={{
      height: '400px',
      textAlign: 'left',
      border: 2,
      borderColor: isDarkMode ? 'grey.700' : 'gray',
      backgroundColor: isDarkMode ? 'grey.800' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      overflow: 'hidden',
      position: 'relative',
      transition: '0.5s ease-in-out',
      '&:hover .card-image': {
        transform: 'translateY(-175px)',
        filter: 'grayscale(0%)'
      },
      '&:hover .card-content': {
        transform: 'translateY(230px)'
      },
      '&:hover .icon-buttons': {
        right: -5,
      },
      '&:hover': {
        borderColor: '#E91E63',
      }
    }}
  >
    {/* Social Media Icons */}
    <Box
      className='icon-buttons'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        right: -60,
        top: 20,
        transition: 'right 0.5s ease-in-out',
        border: 2,
        borderRight: 0,
        borderColor: '#E91E63',
        borderRadius: '5px',
        gap: 1,
        padding: 0.9,
        backgroundColor: isDarkMode ? 'grey.700' : '#fff'
      }}
    >
      <FacebookIcon sx={{ fontSize: 25, color: '#3b5998' }} />
      <TwitterIcon sx={{ fontSize: 25, color: '#1DA1F2' }} />
      <LinkedInIcon sx={{ fontSize: 25, color: '#0077B5' }} />
    </Box>
    <CardContent
      className='card-content'
      sx={{
        p: 2,
        transition: 'transform 0.5s ease-in-out'
      }}
    >
      <Typography variant='h5' gutterBottom>
        {person.name}
      </Typography>
      <Typography variant='subtitle1'>{person.content1}</Typography>
      <Typography variant='body2' sx={{ color: isDarkMode ? "#fff" : "textSecondary" }}>
        {person.content2}
      </Typography>
    </CardContent>
    <Box
      sx={{
        textAlign: 'center',
        filter: 'grayscale(100%)',
        transition: 'transform 0.5s ease-in-out, filter 0.5s ease-in-out',
        '&:hover': {
          filter: 'grayscale(0%)'
        }
      }}
    >
      <img
        alt={person.name}
        src={person.image}
        className='card-image'
        style={{
          width: '220px',
          height: '240px',
          marginTop:"40px",
          objectFit: "cover",
          transition: 'transform 0.5s ease-in-out, filter 0.5s ease-in-out'
        }}
      />
    </Box>
  </Box>
);

// Main Page Component
const FounderPage = () => {
  const isDarkMode = useSelector(state => state.darkMode);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await API.get('/founder');
      setContents(response.data);
      
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4, md: 5 },
        backgroundColor: isDarkMode ? 'grey.900' : '',
        textAlign: 'center'
      }}
    >
      <Container>
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          sx={{
            mt: 5,
            color: isDarkMode ? '#fff' : 'textSecondary'
          }}
        >
          Meet the{' '}
          <span style={{ color: '#E91E63', fontSize: '40px' }}>Dreamers</span>
        </Typography>
        <Grid container spacing={4} justifyContent='center'>
          {contents.map((person, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <DreamerCard person={person} isDarkMode={isDarkMode} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FounderPage;
