import express from 'express';
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import courseRoutes from "./courseRoutes.js";
import eventRoutes from "./eventRoutes.js";
import fileRoutes from "./fileRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/course", courseRoutes);
router.use("/event", eventRoutes);
router.use("/file", fileRoutes);

export default router;