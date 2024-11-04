import express from 'express';
import { createEventShowCase, deleteEventShowcase, getAllEventShowcases, getEventShowcaseById, updateEventShowcase } from '../controllers/eventShowCaseController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Route to create a new showcase event
router.post('/',authMiddleware, createEventShowCase);

// Route to update a showcase event by ID
router.put('/:id',authMiddleware, updateEventShowcase);

// Route to delete a showcase event by ID
router.delete('/:id',authMiddleware, deleteEventShowcase);

// Route to get all showcase events
router.get('/', getAllEventShowcases);

// Route to get a single showcase event by ID
router.get('/:id', getEventShowcaseById);

export default router;
