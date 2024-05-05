import express from 'express';
import { protectRoute, isAdminRoute } from '../middlewares/authMiddleware.js';
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getTeamList,
    getNotificationsList,
    updateUserProfile,
    markNotificationRead,
    changePassword,
    activateUserProfile,
    deleteUserProfile,
 } from '../controllers/userController.js';

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);

router.get("/profile", protectRoute, updateUserProfile);
router.get("/read-noti", protectRoute, markNotificationRead);
router.get("/change-password", protectRoute, changePassword);

// // FOR ADMIN ONLY - ADMIN ROUTES

router
    .route("/:id")
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);
    
export default router;