

function Balanceoverview(){

    return(
        <div className="rounded-xl shadow-md mt-10 mx-2 p-3 bg-gray-200 ">
            <h1 className="text-md text-center sm:text-left text-2xl sm:text-3xl text-blue-400">BalanceOverview</h1>
            <div className=" flex flex-col  sm:flex sm:flex-row justify-around items-cente p-4 gap-5 sm:gap-10">
                <div className="hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200 bg-red-200 rounded-md   p-5 flex flex-col">
                    Total Income
                    <input type="text" placeholder="enter amout" />
                </div>
                <div className="hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200 bg-pink-300 rounded-md  p-5  flex flex-col">
                    Total Expenses
                    <input type="text" placeholder="enter amout" />
                </div>

                <div className="hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200 bg-cyan-300 rounded-md  p-5  flex flex-col">
                    Remaining balance
                    <input type="text" placeholder="enter amout" />
                </div>
                
            </div>
        </div>
    )
}

export default Balanceoverview;