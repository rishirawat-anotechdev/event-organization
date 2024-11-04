import express from 'express';
import { 
  createContent, 
  getAllContent, 
 
  updateContent, 
  deleteContent 
} from '../controllers/blogController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Define routes
router.post('/', authMiddleware, createContent); // Create new content
router.get('/', getAllContent); // Get all content
// router.get('/:id', getContentById); // Get single content by ID
router.put('/:id', authMiddleware, updateContent); // Update content by ID
router.delete('/:id', authMiddleware, deleteContent); // Delete content by ID

export default router;
