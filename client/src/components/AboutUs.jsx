import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CountUp from 'react-countup';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { useSelector } from 'react-redux';
import API from "../API/api";

const AboutUs = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [aboutUsSection, setAboutUsSection] = useState(null);
  const statsRef = useRef(null);

  const fetchAboutUsSection = async () => {
    try {
      const response = await API.get('/aboutUs');
      setAboutUsSection(response.data);
    } catch (error) {
      console.error('Error fetching About Us section:', error);
    }
  };

  // Initialize Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchAboutUsSection();
  }, []);

  if (!aboutUsSection) return null;

  const statsData = [
    {
      icon: <FavoriteBorderIcon sx={{ fontSize: 50, color: '#FFA500' }} />,
      number: aboutUsSection.completedProjects,
      label: 'Completed Projects',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 50, color: '#4CAF50' }} />,
      number: aboutUsSection.originalConcepts,
      label: 'Original Concepts',
    },
    {
      icon: <DescriptionIcon sx={{ fontSize: 50, color: '#F44336' }} />,
      number: aboutUsSection.regularCustomers,
      label: 'Regular Customers',
    },
    {
      icon: <MilitaryTechIcon sx={{ fontSize: 50, color: '#2196F3' }} />,
      number: aboutUsSection.yearsOfExperience,
      label: 'Years of Experience',
    },
  ];

  // Split the content into two halves
  const halfIndex = Math.ceil(aboutUsSection.content.length / 2);
  const firstHalf = aboutUsSection.content.slice(0, halfIndex);
  const secondHalf = aboutUsSection.content.slice(halfIndex);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4, md: 5 },
        backgroundColor: isDarkMode ? 'grey.900' : '',
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 2,
          mt: 5,
          color: isDarkMode ? '#fff' : 'textSecondary',
          fontSize: '50px',
          textAlign: 'center',
        }}
      >
        We have many years of experience in <br />
        <span style={{ color: '#E91E63', fontSize: '60px' }}>
          organizing events
        </span>
      </Typography>

      {/* Stats Section */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        ref={statsRef}
      >
        {statsData.map((stat, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ textAlign: 'center' }}
          >
            <Box sx={{ marginBottom: '1rem' }}>{stat.icon}</Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: isDarkMode ? '#fff' : 'textSecondary',
              }}
            >
              {hasAnimated ? (
                <CountUp end={stat.number} duration={2} />
              ) : (
                stat.number
              )}
              +
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: isDarkMode ? '#fff' : 'textSecondary' }}
            >
              {stat.label}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Content Section */}
    
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {/* First Column */}
        <Grid item xs={12} md={6}>
      
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? '#fff' : 'textSecondary', textAlign: 'justify' }}
          >
            <span style={{ color: isDarkMode ? '#fff' : '#ff3465',
          fontSize: '30px',
         }}>{aboutUsSection.heading}{" "}</span>
            <span style={{ color: '#ff3465', fontSize: '1.5em' }}>
              {firstHalf.charAt(10)}
            </span>
            {firstHalf.slice(11)}
          </Typography>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? '#fff' : 'textSecondary', textAlign: 'justify' }}
          >
            <span style={{ color: '#ff3465', fontSize: '1.5em' }}>
              {secondHalf.charAt(0)}
            </span>
            {secondHalf.slice(1)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
