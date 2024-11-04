import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Chip } from '@mui/material';
import { Business, MusicNote, Mic, ShoppingBag, SportsSoccer, TravelExplore } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../API/api';

const icons = {
  Business: <Business />,
  Concert: <MusicNote />,
  Conference: <Mic />,
  Festival: <ShoppingBag />,
  Sport: <SportsSoccer />,
  Travel: <TravelExplore />,
};

const CategoryPage = () => {
  const isDarkMode = useSelector(state => state.darkMode);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Box sx={{
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 2, sm: 4, md: 5 },
      backgroundColor: isDarkMode ? 'grey.900' : '#300843',
      textAlign: 'center',
    }}>
      {/* Title Section */}
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2, color: '#fff', fontSize: "50px" }}>
        POPULAR<span style={{ color: '#E91E63', fontSize: "60px" }}> CATEGORIES </span>
      </Typography>
      <Box sx={{ width: 60, height: 4, backgroundColor: '#E91E63', margin: '0 auto', mb: 4 }} />

      {/* Responsive Grid */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={category._id}>
            <Link to={`/events/${category._id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{
                textAlign: 'center',
                py: 3,
                backgroundColor: isDarkMode ? '#424242' : '#f9f9f9',
                color: isDarkMode ? '#ffffff' : '#E91E63',
                transition: 'transform .5s ease-in-out',
                '&:hover': {
                  boxShadow: 4,
                  backgroundColor: '#E91E63',
                  color: '#fff',
                },
              }}>
                {/* Category Icon */}
                <Box sx={{ fontSize: 40 }}>
                  {icons[category.title] || <Business />} {/* Default icon if not matched */}
                </Box>

                {/* Category Title */}
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, whiteSpace:"nowrap" }}>
                    {category.title}
                  </Typography>

                  {/* Count Chip */}
                  {/* <Chip
                    label={category.count}
                    size="small"
                    sx={{
                      backgroundColor: isDarkMode ? '#616161' : '#f0f0f0',
                      fontWeight: 600,
                      color: isDarkMode ? '#ffffff' : '#000000',
                    }}
                  /> */}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryPage;
