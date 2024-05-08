import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Task from "../models/task.js";
import Event from "../models/event.js";
import File from "../models/files.js";

const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if(token){
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            const resp = await User.findById(decodedToken.userId).select(
                "isAdmin email"
            );

            req.user = {
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: decodedToken.userId,
            };

            next();
        } else {
            return res
                .status(401)
                .json({ status: false, message: "Not authorized. Try login again." });
        }
    } catch(error) {
        console.log(error);
        return res
            .status(401)
            .json({ status: false, message: "Not authorized. Try login again." })
    }
};

const isAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "Not autherized as admin. Try login as admin.",
        });
    }
}; 

const isTaskCreator = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                status: false,
                message: 'Task not found',
            });
        }

        if (String(task.createdBy) === String(userId)) {
            next();
        } else {
            return res.status(401).json({
                status: false,
                message: 'Not authorized to access this task.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};

const isEventCreator = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                status: false,
                message: 'Event not found',
            });
        }

        if (String(event.createdBy) === String(userId)) {
            next();
        } else {
            return res.status(401).json({
                status: false,
                message: 'Not authorized to access this event.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};

const isFileUploader = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({
                status: false,
                message: 'File not found',
            });
        }

        if (String(file.createdBy) === String(userId)) {
            next();
        } else {
            return res.status(401).json({
                status: false,
                message: 'Not authorized to access this file.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};

export { isAdminRoute, protectRoute, isTaskCreator, isEventCreator, isFileUploader };