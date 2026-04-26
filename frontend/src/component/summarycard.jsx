import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";



function Summarycard() {

    const { transaction, deleteTransaction } = useContext(ExpenseContext)


    return (

        <div className="bg-white text-black dark:bg-[#14243c]/20 dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl mt-3 mx-1.5 sm:mx-2 transition-colors duration-500">
            <h1 className="text-md text-center sm:text-left text-2xl  sm:text-3xl text-blue-400 drop-shadow-[0_0_10px_#3b82f6]">Recent Transactions</h1>
            <hr />

            <div className="grid grid-cols-4 text-sm sm:text-2xl mt-4 mb-2 items-center">

                <div>Date</div>
                <div className="sm:hidden">Desc.</div>
                <div className="hidden sm:inline">Description</div>
                <div>Category</div>
                <div>Amount</div>


            </div>

            <div className="max-h-[240px] overflow-y-scroll pr-1 mt-2 space-y-3 custom-scroll" >
                {

                    Array.isArray(transaction) &&
                    [...transaction].reverse().map((item) => (

                        <div key={item.id} className="relative grid grid-cols-4 items-center hover:scale-105 text-xs sm:text-lg bg-gray-100 dark:bg-[#14243c]/10 border border-gray-200 dark:border-white/10 rounded-md sm:rounded-xl cursor-pointer px-1 py-2 sm:py-3 hover:bg-gray-200 dark:hover:bg-[#14243c]/30 transition duration-500">
                            <div className="text-[11px] sm:text-xl">{item.date}</div>
                            <div className="text-sm sm:text-xl">{item.description}</div>
                            <div className="text-sm sm:text-xl">{item.category}</div>


                            <div
                                className={` font-medium ${item.type === "expense"
                                    ? "text-[11px] sm:text-xl drop-shadow-[0_0_10px_#3b82f6] text-red-500"
                                    : "text-[11px] sm:text-xl drop-shadow-[0_0_10px_#3b82f6] text-green-600"
                                    }`}
                            >
                                {item.type === "expense" ? "-" : "+"}
                                ₹{item.amount}
                            </div>
                            <i onClick={() => { if (window.confirm("Are you really sure!!!")) { deleteTransaction(item.id) } }} className="absolute right-0.5 sm:right-3 cursor-pointer text-red-600  fa-regular fa-trash-can"></i>




                        </div>
                    ))

                }
            </div>


            {(!transaction || transaction.length === 0) && (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                    No transactions available.
                </p>
            )}

        </div>
    )
}

export default Summarycard;