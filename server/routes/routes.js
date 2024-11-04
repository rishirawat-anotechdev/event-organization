import express from 'express'
const router = express.Router()

// Import Routes
import authRoutes from "./authRoutes.js"
import heroPageRoutes from "./heroPageRoutes.js"
import deleteDemoVideoRoutes from "./videoRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
import eventRoutes from "./eventRoutes.js"
import showCaseRoutes from "./showCaseEventRoutes.js"
import aboutUs from "./aboutUsRoutes.js"
import founderRoutes from "./foundersRoutes.js"
import blogRoutes from "./blogRoutes.js"
import messageRoutes from "./messageRoutes.js"
import testimonialRoutes from "./testimonialRoutes.js"


router.use('/auth',  authRoutes);
router.use('/hero', heroPageRoutes);
router.use('/video', deleteDemoVideoRoutes);
router.use('/category', categoryRoutes);
router.use('/event', eventRoutes);
router.use('/showCase', showCaseRoutes);
router.use('/aboutUs', aboutUs );
router.use('/founder', founderRoutes );
router.use('/blogs', blogRoutes );
router.use('/message', messageRoutes );
router.use('/testimonial', testimonialRoutes)
export default router

