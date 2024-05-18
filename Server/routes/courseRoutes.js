import express from 'express';
import { protectRoute, isAdminRoute } from '../middlewares/authMiddleware.js';
import {
    addCourse,
    getCourse,
    getCourseById,
    trashCourse,
    updateCourse,
    deleteRestoreCourse,
} from '../controllers/courseContoller.js';

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, addCourse);

router.get("/", protectRoute, getCourse);
router.get("/get-course/:id", protectRoute, getCourseById);

router.put("/update/:id", protectRoute, isAdminRoute, updateCourse);
router.put("/:id", protectRoute, isAdminRoute, trashCourse);

router.delete(
    "/delete/:id",
    protectRoute,
    isAdminRoute,
    deleteRestoreCourse
);

export default router;