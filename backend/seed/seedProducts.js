// seedProducts.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/productModel"); // Product model
const products = require("../data/products"); // array of 30 products
const connectDB = require("../config/db"); // DB connection

dotenv.config();

// Main async function to seed products
const seedProducts = async () => {
    try {
        // 1️⃣ Connect to DB
        await connectDB();
        console.log("MongoDB connected...");

        // 2️⃣ Optional: Delete existing products to avoid duplicates
        await Product.deleteMany();
        console.log("Existing products removed...");

        // 3️⃣ Insert new products
        await Product.insertMany(products);
        console.log("Seeded 30 products successfully!");

        process.exit(0); // Exit script successfully
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1); // Exit with error code
    }
};

// Run the seeding function
seedProducts();