const express = require("express")
const cors = require('cors')
require('dotenv').config()

const connecttoDb = require('./db.config')
const port = process.env.PORT

const app = express()

const corsOption = {
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
}

app.use(cors(corsOption))


//connect to DB

connecttoDb().then(() => {
    app.listen(port,()=>{
        console.log(`app is running on ${port}`)
    })
    
}).catch((err) => {
    console.error("error connecting to database");
    
    
});
