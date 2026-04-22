import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";



function Navbar() {

    const { user, Setshowlogin, logout } = useContext(ExpenseContext)

    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false);

    return (


        <div className="fixed z-50 w-full">



            <div className="flex relative   dark:bg-[#14243c]/8 border border-gray-200 dark:border-white/5  items-center cursor-pointer  justify-between w-full  text-black  dark:text-white  p-2 sm:p-2.5 text-sm sm:text-2xl font-extrabold transition-colors duration-500">


                <div>

                    <h1 className="nav text-blue-300 text-center bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500" onClick={() => navigate("/")}>Fintracko</h1>
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
                                    <li className="nav text-blue-300 text-center bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500" onClick={() => { navigate("/addtransaction"); setOpenMenu(false); }}>Add Expense</li>
                                    <li onClick={logout} className="nav text-red-400  bg-[#14243c]/20  border  border-white/10 rounded-2xl px-4 py-2 shadow-2xl  duration-500 ">Logout:{user.name}</li>

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