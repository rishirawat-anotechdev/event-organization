import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useSelector } from 'react-redux';
import API from '../API/api';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const isDarkMode = useSelector(state => state.darkMode);
  const [blogs, setBlogs] = useState([]);

 
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await API.get('/blogs'); 
      setBlogs(response.data);
   
    } catch (error) {
      console.error('Error fetching blogs:', error);
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
      <Container maxWidth="lg" marginTop={5}>
        <Typography variant="overline" sx={{ color: isDarkMode ? '#fff' : 'textSecondary' }}>
          NEWS & BLOG
        </Typography>
        <Typography variant="h4" sx={{ color: '#E91E63', fontSize: '40px', mb: 4 }}>
          Corporate Events Tips, Hacks & More
        </Typography>
        
        {/* Grid for Blog Cards */}
        <Grid container spacing={4} justifyContent="center">
          {blogs.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  backgroundColor: isDarkMode ? '#424242' : '#fff',
                  position: 'relative'
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={post.imageUrl}
                  alt={post.title}
                />
                {/* Play Icon */}
                <Link to={`${post.videoUrl}`}>
                <PlayCircleOutlineIcon
                  sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '50px',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                />
                </Link>
                <CardContent sx={{ flexGrow: 1, textAlign: 'left', p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: '#E91E63', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {post.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* View All Posts Button */}
        <Box sx={{ mt: 5 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 20,
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            View All Posts
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogPage;
