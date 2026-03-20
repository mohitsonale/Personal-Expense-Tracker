import express from "express"
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import authrouter from "./route/authRoutes.js";
import userrouter from "./route/userRoutes.js";


let app=express();

app.use(express.json());
await connectDB();

app.get("/",(req,res)=>{
    res.send("PERSONAL EXPENSES TRACKER")
})

app.use('/api/auth',authrouter);
app.use('/api/user',userrouter);

app.listen(process.env.PORT,()=>console.log(`Server is running on ${process.env.PORT}`)) 

