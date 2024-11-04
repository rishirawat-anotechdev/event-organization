import express from "express"
import { createHeroPage, deleteHeroPage, getHeroPageById, getHeroPages, updateHeroPage } from "../controllers/heroPageController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { deleteDemoVideo, getVideo, uploadVideo } from "../controllers/DemoVideoController.js";


const router = express.Router();

// Define CRUD routes
router.post('/', authMiddleware, createHeroPage);             
router.get('/', getHeroPages); 
router.get('/:id', getHeroPageById);                 
router.put('/:id',authMiddleware, updateHeroPage);            
router.delete('/:id',authMiddleware, deleteHeroPage);  





export default router;
