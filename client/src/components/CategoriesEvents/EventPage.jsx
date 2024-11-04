import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material'
import five from '../../assets/five.jpg'
import one from '../../assets/one.jpg'
import HeaderPage from '../HeaderPage'
import banner1 from '../../assets/banner2.jpg'
import { useSelector } from 'react-redux'
import API from '../../API/api'
import { useParams } from 'react-router-dom'



function EventPage () {
  const isDarkMode = useSelector(state => state.darkMode)
  const { categoryId } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
    
      try {
        const response = await API.get(`/event?categoryId=${categoryId}`);
        setEvents(response.data);
      } catch (error) {
       
        console.error('Error fetching events:', error);
      } 
    };
    fetchEvents();
  }, [categoryId]);
  return (
    <>
      <HeaderPage>
        <Box
          sx={{
            backgroundColor: isDarkMode ? 'grey.900' : '#300843'
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <img
              src={banner1}
              alt='bannerImg'
              style={{
                width: '100%',
                height: '40vh',
                objectFit: 'cover',
                filter: 'brightness(0.6)',
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)'
              }}
            />
            <Typography
              variant='h3'
              gutterBottom
              sx={{
                position: 'absolute',
                top: 100,
                px: { sm: '6rem', md: '10rem' },
                color: '#fff'
              }}
            >
              Categories {'>'}
              <span
                style={{
                  color: isDarkMode ? '#fff' : '#E91E63',
                  fontSize: '3.5rem'
                }}
              >
                {' '}
                Sports
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              px: { xs: 2, sm: 4, md: 8 },
              py: { xs: 2, sm: 4, md: 5 },
              mt: 5
            }}
          >
            <Grid container spacing={4}>
              {events.map(event => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      maxWidth: '400px',
                      width: '100%',
                      backgroundColor: isDarkMode ? 'grey.700' : '#fff',
                      color: isDarkMode ? '#fff' : '#000'
                    }}
                  >
                    {/* Event Image */}
                    <Box
                      sx={{
                        overflow: 'hidden',
                        '&:hover img': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                      />
                    </Box>

                    <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                      {/* Event Title */}
                      <Typography variant='h5' component='div'>
                        {event.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mb: 2 }}
                      >
                        {event.description}
                      </Typography>

                      {/* Contact Us Button */}
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
                      >
                        Contact
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </HeaderPage>
    </>
  )
}

export default EventPage
