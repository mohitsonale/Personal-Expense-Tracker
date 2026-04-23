import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";


function Balanceoverview() {

    const { Cleartransaction, totalIncome, totalExpense, totalBalance } = useContext(ExpenseContext);




    return (
        <div className="relative mt-7 mx-2   dark:bg-[#14243c]/20   border border-gray-200 dark:border-white/10  rounded-2xl p-3 lg:p-4 shadow-xl transition-colors duration-500">
            <h1 className="text-md text-center lg:text-left text-2xl lg:text-3xl  text-blue-400 drop-shadow-[0_0_10px_#3b82f6]">BalanceOverview</h1>
            <i onClick={() => { if (window.confirm("Are you sure want to delete the whole data")) { Cleartransaction() } }} class="absolute right-6 lg:right-2 top-3 lg:top-7 text-2xl text-red-600 fa-regular fa-trash-can"></i>
            <div className=" flex flex-col  lg:flex lg:flex-row justify-around items-cente p-4 lg:p-6 gap-2 lg:gap-4 shadow-2xl">
                <div className=" w-full hover:scale-105 transition-all duration-300 
                bg-gray-100 dark:bg-[#14243c]/20  border border-gray-200 dark:border-white/10 rounded-xl p-5 flex justify-between items-center hover:bg-gray-200 dark:hover:bg-cyan-800/20">
                    <div className="flex  flex-col">

                        <span className="text-2xl font-semibold text-white drop-shadow-[0_0_10px_#3b82f6]">Total Balance</span>
                        <p className="text-xl mt-2 text-blue-300">$ {totalBalance}</p>
                    </div>
                    <i className=" text-4xl w-14 h-14  text-center  p-2 rounded-xl bg-blue-950/20 text-blue-300 fa-solid fa-wallet"></i>
                </div>
                <div className=" w-full hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-[#14243c]/20 border border-gray-200 dark:border-white/10 rounded-xl p-5 flex justify-between items-center hover:bg-gray-200 dark:hover:bg-green-800/20">
                    <div className="flex flex-col">

                        <span className="text-2xl font-semibold text-white drop-shadow-[0_0_10px_#3b82f6]">Total Income</span>
                        <p className="text-xl mt-2 text-green-400">$ {totalIncome}</p>

                    </div>
                    <i className="text-4xl w-14 h-14 text-center   p-2 rounded-xl bg-green-200/10 text-green-600 fa-solid fa-arrow-trend-up"></i>
                </div>

                <div className=" w-full hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-[#14243c]/20  border border-gray-200 dark:border-white/10 rounded-xl p-5 flex justify-between items-center hover:bg-gray-200 dark:hover:bg-red-800/20">
                    <div className="flex flex-col">

                        <span className="text-2xl font-semibold text-white drop-shadow-[0_0_10px_#3b82f6]">Total Expense</span>
                        <p className="text-xl mt-2 text-red-400">$ {Math.abs(totalExpense)}</p>
                    </div>
                    <i className="text-4xl w-14 h-14 text-center  p-2 rounded-xl bg-red-300/10 text-red-600 fa-solid fa-arrow-trend-down"></i>

                </div>

            </div>
        </div>
    )
}

export default Balanceoverview;