const express = require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const path = require("path");
const authRouter=require('./routes/authRoutes.js');
const cookieParser=require('cookie-parser');
const cors=require('cors');
dotenv.config({path:path.join(__dirname,"config.env")});
const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);
const port=process.env.PORT||8000;
mongoose.connect(DB).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
    process.exit(1)
})
const allowedOrigins=['http://127.0.0.1:5173'];
const app=express();
app.use(cors({origin:allowedOrigins,credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.use('/api/auth',authRouter);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
