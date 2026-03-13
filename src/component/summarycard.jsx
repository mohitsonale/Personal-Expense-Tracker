import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";


function Summarycard() {

    const { transaction,deleteTransaction } = useContext(ExpenseContext)


    return (

        <div className="bg-[#14243c]/20 border border-white/5 rounded-2xl p-6 shadow-2xl mt-3 text-white
                mx-1.5 sm:mx-2">
            <h1 className="text-md text-center sm:text-left text-2xl  sm:text-3xl text-blue-400">Recent Transactions</h1>
            <hr />
         
            <div className="grid grid-cols-4  text-sm  sm:text-2xl mt-4 mb-2  items-center ">

                <div>Date</div>
                <div>Describtion</div>
                <div>Category</div>
                <div>Amout</div>


            </div>

            <div>
                {
                    [...transaction].reverse().map((item) => (

                        <div key={item.id} className="relative grid text-sm sm:text-xl  grid-cols-4 bg-[#14243c]/10 border border-white/5 shadow-2xl rounded-xl   py-2  my-4  items-center">
                            <div className="text-xs sm:text-xl">{item.date}</div>
                            <div>{item.description}</div>
                            <div>{item.category}</div>


                            <div
                                className={` font-medium ${item.type==="expense"
                                    ? "text-red-500"
                                    : "text-green-600"
                                    }`}
                            >
                                {item.type === "expense" ? "-" : "+"}
                                ₹{item.amount}
                            </div>
                            <i onClick={()=>{if(window.confirm("Are you really sure!!!")){deleteTransaction(item.id)}}}  className="absolute right-1 sm:right-3 cursor-pointer text-red-600  fa-regular fa-trash-can"></i>

                      


                        </div>
                    ))

                }
            </div>




        </div>
    )
}

export default Summarycard;