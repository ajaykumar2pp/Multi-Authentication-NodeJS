require('dotenv').config()
const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.Database_URL);
        console.log("✅ Successfully connected to the database");
    } catch (error) {
        onsole.error("🚨 Database connection error:", err.message);
        process.exit(1);
    }
}

module.exports = { connectMongoDB }