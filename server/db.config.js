require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGO_URI


const connectToDb = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1); 
    }
};

module.exports = connectToDb;