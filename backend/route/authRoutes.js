import express from "express"
import { isAuthenticated, login, registeruser } from "../Controller/authController.js";
import authMiddleware from "../Middleware/auth.js";

let authrouter=express.Router();

authrouter.post('/register',registeruser);
authrouter.post('/login',login);
authrouter.get('/is-authentication',authMiddleware,isAuthenticated)

export default authrouter; 