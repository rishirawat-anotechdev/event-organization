import express from 'express';
import { createTestimonial, getAllTestimonials, deleteTestimonial } from '../controllers/testimonialController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new testimonial
router.post('/', authMiddleware, createTestimonial);

// Route to get all testimonials
router.get('/', getAllTestimonials);

// Route to delete a testimonial by ID
router.delete('/:id', authMiddleware, deleteTestimonial);

export default router;
