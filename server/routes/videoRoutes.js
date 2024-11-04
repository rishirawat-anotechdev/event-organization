import express from "express"

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { deleteDemoVideo, getVideo, uploadVideo } from "../controllers/DemoVideoController.js";


const router = express.Router();



             //// videoURL routes////
// Route for uploading video
router.post('/upload',authMiddleware, uploadVideo);

// Route for retrieving video
router.get('/', getVideo);
router.delete('/',authMiddleware, deleteDemoVideo);



export default router;
