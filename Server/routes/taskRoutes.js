import express from 'express';
import { isAdminRoute, protectRoute, isTaskCreator } from "../middlewares/authMiddleware.js";
import {
    createTask,
    duplicateTask,
    dashboardStatistics,
    getTasks,
    getTask,
    createSubTask,
    updateTask,
    trashTask,
    deleteRestoreTask,
    postTaskActivity,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.post("/duplicate/:id", protectRoute, isTaskCreator, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, isTaskCreator, createSubTask);
router.put("/update/:id", protectRoute, isTaskCreator, updateTask);
router.put("/:id", protectRoute, isTaskCreator, trashTask);

router.delete(
    "/delete-restore/:id?",
    protectRoute,
    //isTaskCreator,
    deleteRestoreTask
);

export default router;