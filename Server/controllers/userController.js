import User from "../models/user.js";
import { createJWT } from "../utils/index.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin, role, title } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist){
            return res.status(400).json({
                status: false,
                message: "User already exists",
            });
        }

        const user = await User.create({
            name, email, password, isAdmin, role, title
        });

        if(user){
            isAdmin ? createJWT(req, user._id) : null;

            user.password = undefined;

            res.status(201).json(user);
        } else {
            return res
                .status(400)
                .json({ status: false, message: "Invalid user data" });
        }
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res
                .status(401)
                .json({ status: false, message: "Invalid email or password." });
        }

        if(!user?.isActive){
            return res.status(401).json({
                status: false,
                message: "User acount has been deactivated, contact the administrotor",
            });
        }

        const isMatch = await user.matchPassword(password)

        if(user && isMatch){
            createJWT(res, user._id);

            user.password = undefined;

            res.status(200).json(user);
        }
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "Logout successfull."});
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

// export const registerUser = async (req, res) => {
//     try {

//     } catch (error) {
//         return res.status(400).json({ status: false, message: error.message });
//     }
// };