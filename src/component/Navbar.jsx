import { useNavigate } from "react-router-dom";


function Navbar(){

    const navigate=useNavigate()

    return(

        <div className="flex justify-between w-full  items-center    p-2 sm:p-3 outline-none selection:text-green-300 selection:bg-black    bg-gradient-to-br from-[#0f172a] via-[#0b1f3a] to-[#1e293b] text-sm sm:text-2xl cursor-pointer  font-extrabold">

            <div>
               <h1 className="bg-gradient-to-br from-blue-200 to-cyan-900  bg-clip-text text-transparent" onClick={()=>navigate("/")}>Personal Tracker</h1>
            </div>
            <div className="flex">

                <ul className="flex text-center gap-4 sm:gap-10    ">
                    <li className="bg-gradient-to-br from-blue-200 to-cyan-900  bg-clip-text text-transparent "  onClick={()=>navigate("/dashboard")}>Dashboard</li>
                    <li className="bg-gradient-to-br from-blue-200 to-cyan-900  bg-clip-text text-transparent"  onClick={()=>navigate("/addtransaction")}>Addtransaction</li>
                </ul>

            </div>
            
        </div>
    )
}

export default Navbar;