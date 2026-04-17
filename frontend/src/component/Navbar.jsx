import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";



function Navbar() {

    const { user, Setshowlogin, logout } = useContext(ExpenseContext)

    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false);

    return (


      <div className="fixed z-100 w-full">



        <div className="flex relative   dark:bg-[#14243c]/8 border border-gray-200 dark:border-white/5  items-center cursor-pointer  justify-between w-full  text-black  dark:text-white  p-2 sm:p-3 text-sm sm:text-2xl font-extrabold transition-colors duration-500">


            <div>

                <h1 className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent" onClick={() => navigate("/")}>Fintracko</h1>
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
                                <li className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent " onClick={() => { navigate("/dashboard"); setOpenMenu(false); }}>Dashboard</li>
                                <li className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent" onClick={() => { navigate("/addtransaction"); setOpenMenu(false); }}>Add Expense</li>
                                <li onClick={logout} className=" text-red-600"   >Logout:{user.name}</li>

                            </ul>


                        </div>

:

<div>
                            <h1 className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent" onClick={() => Setshowlogin(true)}>Sign up</h1>
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