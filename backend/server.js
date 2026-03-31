import rateLimit from "express-rate-limit";
import "dotenv/config";
import express from "express"
import cors from 'cors'
import connectDB from "./config/mongodb.js";
import authrouter from "./route/authRoutes.js";
import userrouter from "./route/userRoutes.js";

const PORT = process.env.PORT || 8888

let app = express();

app.use(cors({
    origin: "https://personal-expense-tracker-1-24ee.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"],
    credentials: true
}))

app.use(express.json());
await connectDB();

app.get("/", (req, res) => {
    res.send("PERSONAL EXPENSES TRACKER")
}) 

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

app.use('/api/auth', authrouter);
app.use('/api/user', userrouter);
app.use("/api/auth/register", registerLimiter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

