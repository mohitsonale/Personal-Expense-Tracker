import { useNavigate } from "react-router-dom";


function Navbar(){

    const navigate=useNavigate()

    return(

        <div className="flex justify-between  items-center  p-2 sm:p-2 border selection:text-green-300 selection:bg-black border-gray-400   bg-gradient-to-l from-blue-200 to-blue-500 text-lg sm:text-2xl cursor-pointer text-black">

            <div>
               <h1 onClick={()=>navigate("/")}>Personal Tracker</h1>
            </div>
            <div className="flex">

                <ul className="flex text-center gap-2 sm:gap-10 ">
                    <li  onClick={()=>navigate("/dashboard")}>Dashboard</li>
                    <li  onClick={()=>navigate("/addtransaction")}>Addtranction</li>
                </ul>

            </div>
            
        </div>
    )
}

export default Navbar;