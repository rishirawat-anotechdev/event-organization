import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";


const router = express.Router();

// Admin registration and login routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
