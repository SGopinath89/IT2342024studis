import express from 'express';
import { protectRoute, isFileUploader } from "../middlewares/authMiddleware.js";
import {
    uploadFile,
    //duplicateFile,
    getFiles,
    getFile,
    renameFile,
    trashFile,
    deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", protectRoute, uploadFile);
// router.post("/duplicate/:id", protectRoute, isFileUploader, duplicateFile);

router.get("/", protectRoute, getFiles);
router.get("/:id", protectRoute, getFile);

router.put("/rename/:id", protectRoute, isFileUploader, renameFile);
router.put("/:id", protectRoute, isFileUploader, trashFile);
 
router.delete(
    "/delete/:id?",
    protectRoute,
    isFileUploader,
    deleteFile,
);

export default router;