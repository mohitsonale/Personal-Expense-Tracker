import express from "express"
import { login, registeruser } from "../Controller/authController.js";

let authrouter=express.Router();

authrouter.post('/register',registeruser);
authrouter.post('/login',login);

export default authrouter;