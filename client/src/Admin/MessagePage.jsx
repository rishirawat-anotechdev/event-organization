import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Button, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../API/api';

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

const MessagePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [messageData, setMessageData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch all messages from the API
  const fetchMessages = async () => {
    try {
      const response = await API.get('/message');
      setMessageData(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setSnackbar({ open: true, message: 'Error fetching messages', severity: 'error' });
    }
  };

  // Fetch unread messages from the API
  const fetchUnreadMessages = async () => {
    try {
      const response = await API.get('/message/unread');
      setMessageData(response.data);
    } catch (error) {
      console.error('Error fetching unread messages:', error);
      setSnackbar({ open: true, message: 'Error fetching unread messages', severity: 'error' });
    }
  };

  // Mark a message as read/unread
  const toggleReadStatus = async (id, readStatus) => {
    try {
      await API.patch(`/message/${id}`, { read: !readStatus });
      setSnackbar({
        open: true,
        message: readStatus ? 'Message marked as unread' : 'Message marked as read',
        severity: 'success'
      });
      
      // Refetch messages after updating read status
      if (activeTab === 1) {
        fetchMessages(); 
      } else if (activeTab === 2) {
        fetchUnreadMessages();
        fetchMessages();
      }
    } catch (error) {
      console.error('Error toggling read status:', error);
      setSnackbar({ open: true, message: 'Error toggling read status', severity: 'error' });
    }
  };

  // Delete single message
  const deleteMessage = async (id) => {
    try {
      await API.delete(`/message/${id}`);
      setMessageData((prevData) => prevData.filter((msg) => msg._id !== id));
      setSnackbar({ open: true, message: 'Message deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting message:', error);
      setSnackbar({ open: true, message: 'Error deleting message', severity: 'error' });
    }
  };

  // Delete all messages
  const deleteAllMessages = async () => {
    try {
      await API.delete('/message');
      setMessageData([]);
      setSnackbar({ open: true, message: 'All messages deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting all messages:', error);
      setSnackbar({ open: true, message: 'Error deleting all messages', severity: 'error' });
    }
  };

  // Handle tab change and fetch data accordingly
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1) {
      fetchMessages();
    } else if (newValue === 2) {
      fetchUnreadMessages();
    } else {
      fetchMessages();
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages based on the active tab
  const filteredMessages = () => {
    if (activeTab === 1) return messageData.filter((msg) => msg.read);
    if (activeTab === 2) return messageData.filter((msg) => !msg.read);
    return messageData;
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Tabs for navigation */}
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="All Messages" />
        <Tab label="Read Messages" />
        <Tab label="Unread Messages" />
      </Tabs>

      {/* Messages List */}
      <Box sx={{ border: 1, borderColor: 'gray', borderRadius: 2, mt: 2, p: 2 }}>
        {filteredMessages().map((msg) => (
          <Box
            key={msg._id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              borderBottom: '1px solid #ddd',
            }}
          >
            <Box>
              <Typography variant="subtitle1"><strong>Name:</strong> {msg.name}</Typography>
              <Typography variant="body2"><strong>Message:</strong> {msg.message}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {msg.email}</Typography>
              <Typography variant="body2"><strong>Contact Number:</strong> {msg.contact_number}</Typography>
              <Typography variant="body2"><strong>Preferred Time:</strong> {msg.preferred_time}</Typography>
              <Typography variant="body2"><strong>Date:</strong> {formatDate(msg.createdAt)}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', P: 1 }}>
              <Button
                size="small"
                onClick={() => toggleReadStatus(msg._id, msg.read)}
                sx={{ color: msg.read ? 'green' : 'red' }}
              >
                {msg.read ? 'Mark as Unread' : 'Mark as Read'}
              </Button>
              <IconButton onClick={() => deleteMessage(msg._id)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Box>
          </Box>
        ))}

        {/* Delete All Messages Button */}
        {activeTab === 0 && (
          <Button
            variant="contained"
            color="error"
            onClick={deleteAllMessages}
            sx={{ mt: 2, display: "flex", mx: 'auto' }}
          >
            Delete All Messages
          </Button>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MessagePage;
