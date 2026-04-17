import { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [loading,Setloading]=useState(false);
    const navigate = useNavigate();

    let { Setshowlogin,backendurl } = useContext(ExpenseContext);

    console.log("BACKEND URL:", backendurl);

    const handleSubmit = async (e) => {
        e.preventDefault();
        Setloading(true);

        try {
             const { data } = await axios.post(`${backendurl}/api/auth/reset-password-otp`,
            { email, otp, password }
        );

        if (data.success) {
            toast.success("Password updated ✅");
            setTimeout(() => {
            
            }, 2000);
        } else {
            toast.error(data.message);
        }
            
        } catch (error) {
            toast.error("Error resetting password");
            
        }
        finally{
            Setloading(false);
        }

       
        
    };

    

    return (
        <div className="fixed left-0 right-0 bottom-0 top-0 z-10 text-black dark:text-white backdrop-blur-sm bg-black/30 flex justify-center items-center transition-colors duration-500">

            <motion.form
                onSubmit={handleSubmit}
                className="relative  p-10 bg-white dark:bg-[#14243c]/8 border border-gray-200  dark:border-white/5 rounded-2xl shadow-2xl transition-colors duration-500"
                initial={{ opacity: 0.2, y: 70 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={true}
            >
                <h1 className="text-center text-2xl text-white/60 font-medium">Reset Password</h1>
                

                <div className="flex items-center   bg-gray-100 dark:bg-[#14243c]/30  border border-gray-300 dark:border-gray-400/10 gap-2 rounded-xl mt-5 px-6 py-1">
                    <i className="hover:text-blue-700 cursor-pointer fa-solid fa-envelope w-5"></i>
                    <input className="outline-none text-sm" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="flex items-center   bg-gray-100 dark:bg-[#14243c]/30  border border-gray-300 dark:border-gray-400/10 gap-2 rounded-xl mt-5 px-6 py-1">
                    <i className="hover:text-blue-700 cursor-pointer fa-solid fa-key w-5"></i>
                    <input className="outline-none text-sm" type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
                </div>

                <div className="flex items-center   bg-gray-100 dark:bg-[#14243c]/30  border border-gray-300 dark:border-gray-400/10 gap-2 rounded-xl mt-5 px-6 py-1">
                    <i className="hover:text-blue-700 cursor-pointer fa-solid fa-lock w-5"></i>
                    <input className="outline-none text-sm" type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />

                </div>

                <button onClick={()=>Setshowlogin(true)} className="w-full flex justify-center items-center gap-2 rounded-full hover:bg-blue-900 bg-[#14243c]/8 border border-white/5 font-medium cursor-pointer text-white py-2 mt-4 hover:scale-105 duration-500 transition-all" type="submit">
                
                {loading && <div className="loader"></div>}

                {
                    loading ? "Resetting..." : "Reset Password"
                }
               
                    
                </button>
                <i onClick={() => navigate("/")} className="absolute top-5 text-red-500 right-5 hover:rotate-90 cursor-pointer transition-transform duration-300 fa-solid fa-x"></i>
            </motion.form>
        </div>
    );
}

export default ResetPassword;