import express from 'express';
import {
  createContent,
  getAllContent,
//   getContentById,
  updateContent,
  deleteContent
} from '../controllers/founderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create content
router.post('/',authMiddleware, createContent);

// Get all content
router.get('/', getAllContent);

// Get content by ID
// router.get('/:id', getContentById);

// Update content by ID
router.put('/:id',authMiddleware, updateContent);

// Delete content by ID
router.delete('/:id', authMiddleware, deleteContent);

export default router;
