

function Summarycard() {


    const transaction = [
        {
            id: 1,
            date: "2026-02-23",
            description: "Dinner",
            category: "Food",
            amount: -250,
        },
        {
            id: 2,
            date: "2026-02-22",
            description: "Salary",
            category: "Income",
            amount: 5000,
        },
    ]
    return (

        <div className="rounded-xl mt-3 shadow-md p-4 bg-gray-200 
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
                    transaction.map((item) => (

                        <div key={item.id} className="grid grid-cols-4 items-center text-sm">
                            <div>{item.date}</div>
                            <div>{item.description}</div>
                            <div>{item.category}</div>


                            <div
                                className={` font-medium ${item.amount < 0
                                        ? "text-red-500"
                                        : "text-green-600"
                                    }`}
                            >
                                {item.amount < 0 ? "-" : "+"} ₹{Math.abs(item.amount)}
                            </div>


                        </div>
                    ))

                }
            </div>




        </div>
    )
}

export default Summarycard;