import { useContext, useEffect, useState } from "react";
import{motion} from "framer-motion"
import axios from "axios";
import { toast } from "react-toastify";
import { ExpenseContext } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";



function Login(){

    const[state,Setstate]=useState("Sign up")
    const {Setshowlogin,backendurl,Settoken,Setuser,Settransaction,loadUserTransactions}=useContext(ExpenseContext)
    const[name,Setname]=useState("")
    const[email,Setemail]=useState("")
    const[password,Setpassword]=useState("")

    const navigate=useNavigate()

    const onsubmithandler=async(e)=>{
        e.preventDefault();

        try {

            if(state==="Sign up"){

               const{data} = await axios.post(backendurl + "/api/auth/register",{
                    name,
                    email,
                    password
                })


                if(data.success){

                    Settoken(data.token)
                    Setuser(data.user || {name})
                    loadUserTransactions(data.user.id)
                    // localStorage.setItem("token",data.token)
                    Setshowlogin(false)
                    navigate("/") 
                    toast.success("Account created successfully")

                }
                else{

                    toast.error(data.message)
                }
            
            }
            else{
                const{data}=await axios.post(backendurl + "/api/auth/login",{
                    email,
                    password
                })
                if(data.success){
                    Settoken(data.token)
                    Settransaction([]);
                    Setuser(data.user)
                    loadUserTransactions(data.user.id)
                    localStorage.setItem("token",data.token)
                    Setshowlogin(false)
                    navigate("/") 
                    toast.success("Login successful")
                }
                else{
                    toast.error(data.message)  
                }
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        document.body.style.overflow="hidden";

        return()=>{
            document.body.style.overflow="unset";
        }
    })


    return(
        <div className="fixed left-0 right-0 bottom-0 top-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">

            <motion.form onSubmit={onsubmithandler} className="relative bg-white p-10 rounded-xl text-black"

            initial={{ opacity: 0.2, y: 70 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={true}
            
            >
                {state==="Sign up" ?  <h1 className="text-center text-2xl text-neutral-700 font-medium"> Sign up</h1>
                : 
                 <h1 className="text-center text-2xl text-neutral-700 font-medium"> Login</h1>
                }
               
               {
                state==="Sign up" ? <p className="text-sm text-center text-gray-500">Welcome back! Please sign in to continue.</p>
                :
                <p className="text-sm text-center text-gray-500">Welcome back! Please login in to continue.</p>
               }
                

                {
                    state=="Sign up" && (  <div className="flex items-center border border-gray-400 gap-2 rounded-xl mt-5 px-6 py-1">
                    <i class="fa-solid fa-user w-5"></i>
                    <input onChange={(e)=>Setname(e.target.value)} value={name} type="text" placeholder="Enter your name" required className="outline-none text-sm" />
                </div>)
                }

              
                <div className="flex items-center gap-2 border  border-gray-400 rounded-xl mt-5 px-6 py-1">
                    <i class="fa-solid fa-envelope w-5"></i>
                    <input onChange={(e)=>Setemail(e.target.value)} value={email} type="email" placeholder="Enter your email" required className="outline-none text-sm" />
                </div>
                <div className="flex items-center border border-gray-400 gap-2 rounded-xl mt-5 px-6 py-1">
                    <i class="fa-solid fa-lock w-5"></i>
                    <input onChange={(e)=>Setpassword(e.target.value)} value={password} type="password" placeholder="Enter your password" required className="outline-none text-sm" />
                </div>

                <p className="text-sm text-blue-700 cursor-pointer my-2">Forgot password?</p>

                {
                    state==="Sign up" ?<button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-400 font-medium cursor-pointer  text-white py-2 mt-2 hover:scale-105 duration-500 transition-all">Create Account</button>
                    :
                    <button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-400 font-medium cursor-pointer  text-white py-2 mt-2 hover:scale-105 duration-500 transition-all">Login</button>
                }
                

                {
                    state==="Sign up" ? (<p className="text-center mt-2 text-gray-500">Already have an account! <span className="text-blue-600 cursor-pointer" onClick={()=>Setstate("Login")}>Login</span></p>)
                        :
                        <p className="text-center mt-2 text-gray-500">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={()=>Setstate("Sign up")}>Sign up</span></p>
                    
                }

                

                
                <i onClick={()=>Setshowlogin(false)}  class="absolute top-5 text-red-500 right-5 hover:rotate-90 cursor-pointer transition-transform duration-300  fa-solid fa-x"></i>
              
            
            </motion.form>

        </div>
    )
}

export default Login;