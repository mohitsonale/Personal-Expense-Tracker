import { useNavigate } from "react-router-dom";


function Navbar(){

    const navigate=useNavigate()

    return(

        <div className="flex justify-between  items-center  p-2 sm:p-2 outline-none selection:text-green-300 selection:bg-black    bg-gradient-to-br from-[#0f172a] via-[#0b1f3a] to-[#1e293b] text-md sm:text-2xl cursor-pointer text-white font-bold">

            <div>
               <h1 onClick={()=>navigate("/")}>Personal Tracker</h1>
            </div>
            <div className="flex">

                <ul className="flex text-center gap-2 sm:gap-10 ">
                    <li  onClick={()=>navigate("/dashboard")}>Dashboard</li>
                    <li  onClick={()=>navigate("/addtransaction")}>Addtransaction</li>
                </ul>

            </div>
            
        </div>
    )
}

export default Navbar;