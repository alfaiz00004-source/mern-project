const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/userModel");
const connectDB = require("../config/db");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

const createAdmin = async () => {
    try {
        // 1. Connect to DB
        await connectDB();

        // 2. Check if admin already exists
        const adminExists = await User.findOne({ email: ADMIN_EMAIL });
        if (adminExists) {
            console.log("Admin already exists");
            process.exit(0);
        }

        // 3. Create admin
        await User.create({
            name: "admin",
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: "admin",
        });

        console.log("Admin created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

// Run the script
createAdmin();
