import express from 'express';
import { createAboutUs, deleteAboutUs, getAboutUs, updateAboutUs } from '../controllers/aboutUsContoller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Create About Us section
router.post('/',authMiddleware, createAboutUs);

// Get About Us section
router.get('/', getAboutUs);

// Update About Us section
router.put('/',authMiddleware, updateAboutUs);
router.delete('/:id',authMiddleware, deleteAboutUs);
export default router;
