const mongoose = require("mongoose");

require("dotenv").config()

const URI = process.env.MONGO_URI;

const connectToDb = async () => {
    try {
        if (!URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Connected to MongoDB");

        // Handle disconnections
        mongoose.connection.on("disconnected", () => {
            console.log("⚠️ MongoDB disconnected. Reconnecting...");
        });

    } catch (error) {
        console.error(`❌ Connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectToDb;
