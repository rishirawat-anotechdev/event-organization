import express from "express"
import { markAsRead, getUnreadMessages, getAllMessages, createMessage, deleteAllMessages, deleteMessageById } from "../controllers/messageController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();


// Route to create a new message
router.post('/',createMessage);

// Route to get all messages
router.get('/',authMiddleware,  getAllMessages);

// Route to get unread messages
router.get('/unread',authMiddleware,  getUnreadMessages);

// Route to mark a message as read
router.patch('/:id',authMiddleware,  markAsRead);

router.delete('/',authMiddleware,  deleteAllMessages);
router.delete('/:id',authMiddleware,  deleteMessageById);

export default router;
