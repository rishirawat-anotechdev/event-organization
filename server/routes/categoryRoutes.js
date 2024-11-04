import express from 'express';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/categoryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/',authMiddleware, createCategory);
router.get('/', getAllCategories);
router.put('/:id', authMiddleware,  updateCategory);
router.delete('/:id', authMiddleware,  deleteCategory);

export default router;
