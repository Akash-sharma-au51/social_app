const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const connectToDb = require("./db.config"); 
const port = process.env.PORT || 5000; 
const app = express();

//Middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(cookieParser())
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


connectToDb().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
}).catch((err) => {
    console.error("❌ Error connecting to database:", err);
    process.exit(1); 
});
