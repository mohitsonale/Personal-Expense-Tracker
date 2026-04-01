import { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    
    const navigate=useNavigate();

    const {backendurl}=useContext(ExpenseContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${backendurl}/api/auth/send-otp`, { email });
            console.log("RESPONSE:", data);
        if (data.success) {
            toast.success("OTP sent to email");
            setTimeout(() => {
                navigate("/reset-password");    
                
            },1000);
        } else {
            toast.error(data.message);
        }
            
        } catch (error) {

            toast.error("Error sending OTP");
            
        }

        
    };

    

    return (
        <div className="fixed left-0 right-0 bottom-0 top-0 z-10 text-white backdrop-blur-sm bg-black/30 flex justify-center items-center">

            <motion.form
                onSubmit={handleSubmit}
                className="relative  p-10 bg-[#14243c]/8 border border-white/5 rounded-2xl"
                initial={{ opacity: 0.2, y: 70 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={true}
            >
                <h1 className="text-center text-2xl text-white/60 font-medium">Forgot Password</h1>

                <div className="flex items-center border border-gray-400/10 gap-2 rounded-xl mt-5 px-6 py-1">
                <i className="hover:text-blue-700 cursor-pointer fa-solid fa-envelope w-5"></i>    
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="outline-none text-md" />
                </div>

                <button  className="w-full rounded-full bg-[#14243c]/8 border border-white/5 font-medium cursor-pointer text-white py-2 mt-4 hover:scale-105 duration-500 transition-all" type="submit">SEND OTP</button>
                <i onClick={() => navigate("/")} className="absolute top-5 text-red-500 right-5 hover:rotate-90 cursor-pointer transition-transform duration-300 fa-solid fa-x"></i>
            </motion.form>
        </div>
    );
}

export default ForgotPassword;