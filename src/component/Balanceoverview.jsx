import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";


function Balanceoverview(){

    const {Cleartransaction,totalIncome, totalExpense, totalBalance}=useContext(ExpenseContext);

    
  

    return(
        <div className=" relative mt-7 mx-2  bg-[#14243c]/70  border border-white/5 rounded-2xl p-1 sm:p-4 shadow-xl ">
            <h1 className="text-md text-center sm:text-left text-2xl sm:text-3xl text-blue-400">BalanceOverview</h1>
            <i onClick={()=>{if(window.confirm("Are you sure want to delete the whole data")){Cleartransaction()}}}  class="absolute right-6 sm:right-2 top-3 sm:top-7 text-2xl text-red-600 fa-regular fa-trash-can"></i>
            <div className=" flex flex-col  sm:flex sm:flex-row justify-around items-cente p-4 sm:p-6 gap-2 sm:gap-4 shadow-2xl">
                <div className=" hover:scale-105  transition-all duration-500 mih-h-100  hover:shadow-2xl hover:bg-blue-950 bg-[#14243c]/70 gap-0 sm:gap-5  border border-white/8 rounded-md p-5  flex justify-between items-center">
                    <div className="flex  flex-col">

                   <span className="text-2xl  text-white font-semibold">Total Balance</span> 
                    <p className="text-xl mt-2 text-blue-300">$ {totalBalance}</p>
                    </div>
                    <i  class=" text-4xl w-14 h-14  text-center  p-2 rounded-xl bg-blue-950 text-blue-300 fa-solid fa-wallet"></i>
                </div>
                <div className="hover:scale-105  transition-all duration-500 hover:shadow-2xl  hover:bg-green-200  bg-[#14243c]/70  gap-0 sm:gap-5  border border-white/8 rounded-md p-5 flex justify-between items-center">
                    <div className="flex flex-col">

                   <span className="text-2xl  text-white font-semibold">Total Income</span>
                   <p className="text-xl mt-2 text-green-400">$ {totalIncome}</p> 
                    
                    </div>
                    <i  class="text-4xl w-14 h-14 text-center   p-2 rounded-xl bg-green-200 text-green-600 fa-solid fa-arrow-trend-up"></i>
                </div>

               <div className="hover:scale-105  transition-all duration-500 hover:shadow-2xl hover:bg-red-300 bg-[#14243c]/70  gap-0 sm:gap-5   border border-white/8 rounded-md p-5 flex justify-between items-center">
                    <div className="flex flex-col">

                   <span className="text-2xl text-white font-semibold">Total Expenses</span> 
                    <p className="text-xl mt-2 text-red-400">$ {Math.abs(totalExpense)}</p>
                    </div>
                    <i  class="text-4xl w-14 h-14 text-center  p-2 rounded-xl bg-red-300 text-red-600 fa-solid fa-arrow-trend-down"></i>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Balanceoverview;