import "dotenv/config"
import express from "express"
import cors from 'cors'
import connectDB from "./config/mongodb.js";
import authrouter from "./route/authRoutes.js";
import userrouter from "./route/userRoutes.js";

const PORT= process.env.PORT || 8888

let app=express();

app.use(cors({
    origin:"https://personal-expense-tracker-1-24ee.onrender.com",
    credentials:true 
}))
 
app.use(express.json());
await connectDB();

app.get("/",(req,res)=>{
    res.send("PERSONAL EXPENSES TRACKER")
})

app.use('/api/auth',authrouter);
app.use('/api/user',userrouter);

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`)) 
 
