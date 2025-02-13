require('dotenv').config(); 

const express = require('express');
const connection = require('./db.config');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080;

const app = express();

// CORS Configuration
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOption));

// Middleware
app.use(express.json());
app.use(cookieParser()); // Move this above userRoutes
app.use("/api/users", userRoutes); // Prefix routes to avoid conflicts

// Database Connection
const startServer = async () => {
    try {
        await connection();
        console.log("✅ Database connection successful");

        app.listen(port, () => {
            console.log(`🚀 Server is running on ${port}`);
        });

    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1); 
    }
};


startServer();
