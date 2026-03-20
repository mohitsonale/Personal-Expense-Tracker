import express from 'express'
import getUserdata from '../Controller/Usercontroller.js';
import authMiddleware from '../Middleware/auth.js';

let userrouter=express.Router();

userrouter.get('/userdata',authMiddleware,getUserdata);

export default userrouter; 