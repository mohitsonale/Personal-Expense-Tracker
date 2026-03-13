import { useNavigate } from "react-router-dom";


function Navbar(){

    const navigate=useNavigate()

    return(

        <div className="flex justify-between w-full  items-center bg-[#14243c]/20 border border-white/5   p-2 sm:p-3 outline-none selection:text-green-300 selection:bg-black  text-md sm:text-2xl cursor-pointer  font-extrabold">

            <div>
               <h1 className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent" onClick={()=>navigate("/")}>Personal Tracker</h1>
            </div>
            <div className="flex">

                <ul className="flex text-center gap-4 sm:gap-10    ">
                    <li className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent "  onClick={()=>navigate("/dashboard")}>Dashboard</li>
                    <li className="bg-gradient-to-br from-blue-200/70 to-cyan-900/70  bg-clip-text text-transparent"  onClick={()=>navigate("/addtransaction")}>Addtransaction</li>
                </ul>

            </div>
            
        </div>
    )
}

export default Navbar;