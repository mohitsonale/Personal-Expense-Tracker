import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";


function Summarycard() {

    const { transaction } = useContext(ExpenseContext)

    return (

        <div className="bg-[#14243c] border border-white/5 rounded-2xl p-6 shadow-2xl mt-3 text-white
                mx-1.5 sm:mx-2">
            <h1 className="text-md text-center sm:text-left text-2xl  sm:text-3xl text-blue-400">Recent Transactions</h1>
            <hr />
            {/* //table head */}
            <div className="grid grid-cols-4 text-sm sm:text-xl mt-4 items-center ">

                <div>Date</div>
                <div>Describetion</div>
                <div>Category</div>
                <div>Amout</div>


            </div>

            <div>
                {
                    [...transaction].reverse().map((item) => (

                        <div key={item.id} className="grid grid-cols-4 items-center text-sm">
                            <div>{item.date}</div>
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

                      


                        </div>
                    ))

                }
            </div>




        </div>
    )
}

export default Summarycard;