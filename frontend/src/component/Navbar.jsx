import { div } from "framer-motion/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";


function Navbar() {

    const { user, Setshowlogin, logout } = useContext(ExpenseContext)

    const navigate = useNavigate()
     const [openMenu, setOpenMenu]=useState(false);

    return (

        



            <div className="flex  justify-between w-full  items-center bg-[#14243c]/20 border border-white/5   p-2 sm:p-3 outline-none selection:text-green-300 selection:bg-black  text-sm sm:text-2xl cursor-pointer  font-extrabold">


                <div>
                    <h1 className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent" onClick={() => navigate("/")}>Personal Tracker</h1>
                </div>

                <div className="flex items-center gap-3 relative">

                    {
                        user && (
                            <div className="sm:hidden">
                                <button onClick={()=>setOpenMenu(!openMenu)}><i class="text-red-500 fa-solid fa-bars w-10"></i> </button>

                            </div>
                        )
                    }

                    {
                        user ?
                            <div className="flex">

                                <ul className={`flex flex-col  sm:flex-row text-center gap-3 sm:gap-5 absolute sm:static top-14 right-0 bg-[#14243c] sm:bg-transparent p-4 sm:p-0 rounded-lg shadow-lg sm:shadow-none transition-all duration-300 
                        ${openMenu ? "block" : "hidden"} sm:flex`}>
                                    <li className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent " onClick={() => navigate("/dashboard")}>Dashboard</li>
                                    <li className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent" onClick={() => navigate("/addtransaction")}>Addtransaction</li>
                                    <li onClick={logout} className=" text-red-600"   >Logout:{user.name}</li>

                                </ul>
                                

                            </div>

                            :

                            <div>
                                <h1 className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent" onClick={() => Setshowlogin(true)}>Sign up</h1>
                            </div>


                    }




                </div>




            </div>
        
    )
}

export default Navbar;