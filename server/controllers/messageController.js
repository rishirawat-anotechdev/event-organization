import Message from "../models/MessageModel.js"

// Create a new message (when user contacts admin)
export const createMessage = async (req, res) => {
    try {
        const { name, contact_number, email, preferred_date, message } = req.body;
        const newMessage = new Message({
            name,
            contact_number,
            email,
            preferred_date,
            message
        });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

// Get all messages (for admin)
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({createdAt: -1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
};

// Get unread messages (for admin)
export const getUnreadMessages = async (req, res) => {
    try {
        const unreadMessages = await Message.find({ read: false }).sort({createdAt: -1});
        res.status(200).json(unreadMessages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching unread messages' });
    }
};

// Mark message as read
export const markAsRead = async (req, res) => {
    try {
        const messageId = req.params.id;
        const { read } = req.body
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
      
        
        message.read = read;
        await message.save();
        res.status(200).json({ message: `Message marked as ${read ? 'read' : 'unread'}` });
    } catch (error) {
        res.status(500).json({ error: 'Error marking message as read' });
    }
};



// Delete a single message by ID
export const deleteMessageById = async (req, res) => {
    try {
        const messageId = req.params.id; 
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the message' });
    }
};

// Delete all messages
export const deleteAllMessages = async (req, res) => {
    try {
        await Message.deleteMany(); 
        res.status(200).json({ message: 'All messages deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting all messages' });
    }
};

