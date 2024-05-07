import express from 'express';
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
    createTask,
    duplicateTask,
    postTaskActivity,
    dashboardStatistics,
    getTasks,
    getTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:i", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

export default router;