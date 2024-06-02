import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import dotenv from "dotenv";
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

dotenv.config();

//mongodb connection
export const dbConnection = async () => {
  try {
    //get connection string from .env
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");

    const conn = mongoose.connection;
    const gfs = Grid(conn.db, mongoose.mongo);

    // Check if there's any admin user, if not, create one
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const adminUser = new User({
        name: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        role: 'admin',
        email: process.env.ADMIN_EMAIL,
        regNumber: process.env.ADMIN_REGNUMBER,
      });
      await adminUser.save();
      console.log('Admin user initialized');
    }

    return { gfs };
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export const createJWT = (res, userId) => {
  //creates JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none", //prevent CSRF attack
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });
};
