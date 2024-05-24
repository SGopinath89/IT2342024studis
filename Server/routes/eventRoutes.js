import express from 'express';
import { isAdminRoute, protectRoute, isEventCreator } from "../middlewares/authMiddleware.js";
import {
    createEvent,
    duplicateEvent,
    getEvents,
    getEvent,
    updateEvent,
    trashEvent,
    deleteEvent,
} from "../controllers/eventController.js";
 
const router = express.Router();

router.post("/create", protectRoute, createEvent);
router.post("/duplicate/:id", protectRoute, isEventCreator, duplicateEvent);

router.get("/", protectRoute, getEvents);
router.get("/:id", protectRoute, getEvent);

router.put("/update/:id", protectRoute, isEventCreator, updateEvent);
router.put("/:id", protectRoute, isEventCreator, trashEvent);

router.delete(
    "/delete/:id?",
    protectRoute,
    isEventCreator,
    deleteEvent
);

export default router;