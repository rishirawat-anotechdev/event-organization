import express from 'express';
import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controllers/eventController.js';
import {authMiddleware} from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post('/',authMiddleware, createEvent);
router.get('/', getAllEvents);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;
