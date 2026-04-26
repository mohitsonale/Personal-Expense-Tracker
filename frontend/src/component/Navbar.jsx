import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";
import symbol1 from "../assets/symbol1.png"
import symbol2 from "../assets/symbol2.png";

function Navbar() {

    const { user, Setshowlogin, logout } = useContext(ExpenseContext)

    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false);
    const [open, Setopen] = useState(false);

    return (


        <div className="fixed z-50 w-full">



            <div className="flex relative  sm:bg-[#14243c]/8 sm:border  sm:border-white/5  items-center cursor-pointer  justify-between w-full  text-black  dark:text-white  p-2 sm:p-2.5 text-sm sm:text-2xl font-extrabold transition-colors duration-500">


                <div>

                     <img
                        src={symbol1}
                        alt="Fintracko Logo"
                        onClick={() => navigate("/")}
                        className="sm:hidden w-13 h-12 mt-1 cursor-pointer rounded-xl bg-[#14243c]/20  hover:-translate-y-1.5  duration-500 "
                    />

                    <img
                        src={symbol2}
                        alt="Fintracko Logo"
                        onClick={() => navigate("/")}
                        className="hidden sm:inline w-35 h-14 cursor-pointer rounded-xl hover:shadow-2xl   hover:-translate-y-1  duration-500 "
                    />
                </div>

                <div className="flex items-center gap-3 relative">

                    {
                        user && (
                            <div className="sm:hidden">
                                <button onClick={() => setOpenMenu(!openMenu)}><i className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent fa-solid fa-bars w-10"></i> </button>

                            </div>
                        )
                    }

                    {
                        user ?
                            <div className="flex">

                                <ul
                                    className={`${openMenu ? "flex" : "hidden"} flex-col sm:flex sm:flex-row gap-4 absolute sm:static top-12 right-0  z-50   
                                bg-[#14243c]/10  sm:bg-transparent p-4 sm:p-0 rounded-lg shadow-lg sm:shadow-none`}
                                >
                                    <li className="nav text-blue-300 text-center bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500 " onClick={() => { navigate("/dashboard"); setOpenMenu(false); }}>Dashboard</li>
                                    <li className="nav text-blue-300  bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500" onClick={() => { navigate("/addtransaction"); setOpenMenu(false); }}>Add Expense</li>


                                    <div className="relative">

                                        <div onClick={() => Setopen(!open)} className=" nav text-blue-300  bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500">

                                            Hi, {user.name}
                                        </div>


                                        {open && (
                                            <div className="absolute right-0 mt-2 w-25 sm:w-50  ">



                                                <div onClick={logout} className=" nav text-red-400 text-center   bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500 ">
                                                    Logout
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </ul>


                            </div>

                            :

                            <div>
                                <h1 className="nav text-blue-300 text-center bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500" onClick={() => Setshowlogin(true)}>Sign up</h1>
                            </div>


                    }

                    {/* 
                <button onClick={() => SetdarkMode(!darkMode)}>
                    <i
                        className={`fa-solid ${darkMode ? "fa-sun text-yellow-400" : "fa-moon text-blue-400"
                        } text-xl sm:text-2xl hover:rotate-90 cursor-pointer transition-all duration-500`}
                        ></i>
                </button> */}




                </div>




            </div>
        </div>

    )
}

export default Navbar;