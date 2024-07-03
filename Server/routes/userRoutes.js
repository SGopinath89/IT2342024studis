import express from 'express';
import { protectRoute, isAdminRoute } from '../middlewares/authMiddleware.js';
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserList,
    getNotificationsList,
    updateUserProfile,
    markNotificationRead,
    changePassword,
    activateUserProfile,
    deleteUserProfile,
    getUser,
    updateMyProfile,
    passResetRequest,
 } from '../controllers/userController.js';

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/passwordReset", passResetRequest)

router.get("/get-user", protectRoute, isAdminRoute, getUserList);
router.get("/get-user/:id", protectRoute, getUser);
router.get("/notifications", protectRoute, getNotificationsList);

router.put("/profiles", protectRoute, updateUserProfile);
router.put("/profiles/:id", protectRoute, updateMyProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changePassword);

// // FOR ADMIN ONLY - ADMIN ROUTES

router
    .route("/:id")
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);
    
export default router;