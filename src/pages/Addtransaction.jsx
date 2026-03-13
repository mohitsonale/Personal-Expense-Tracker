import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";




function Addtransaction() {

    const navigate = useNavigate()

    const { addtransaction } = useContext(ExpenseContext)

    const [formData, SetformData] = useState({
        amount: "",
        description: "",
        type: "",
        category: "",
        date:""
    });

    const handlechange = (e) => {


        SetformData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Date.now(),
            amount: Number(formData.amount),
            description: formData.description,
            category: formData.category,
            type: formData.type,
            date: formData.date
        };

        addtransaction(newTransaction);

        navigate("/dashboard");
    };

    return (

        <motion.div className="flex justify-center items-center "

            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={true}
        >

            <form onSubmit={handleSubmit} className="relative  px-10 py-8   mt-12 sm:mt-15 bg-[#14243c]/8 border border-white/5 rounded-2xl  text-white shadow-2xl   " >

                <h1 className="text-center font-medium text-3xl mb-5 text-blue-500">New Transaction</h1>

                <div className="mb-3">


                    <h2 className="mb-1 text-xl text-cyan-300">Amount</h2>
                    <input type="number" name="amount" value={formData.amount} onChange={handlechange} placeholder="0.00" required className=" outline-blue-500 text-md sm:text-xl  text-blue-300 text-shadow-md border rounded-md border-gray-400 px-8 py-2" />




                </div>

                <div className="mb-3">


                    <h2 className="mb-1 text-xl text-cyan-300">Describetion</h2>
                    <input type="text" name="description" value={formData.description} onChange={handlechange} placeholder="e.g.  Weekly Grocery" required className="outline-blue-500 text-blue-300  text-md sm:text-xl  text-shadow-md border rounded-md border-gray-400 px-8 py-2" />




                </div>

                <div className="flex text-left gap-3">

                    <div className="mb-3">
                        <h2 className="mb-1 text-xl text-cyan-300">Type</h2>
                        <select name="type" value={formData.type} onChange={handlechange} className="outline-blue-500  text-md sm:text-xl border border-gray-400 rounded-md text-blue-400 px-8 py-2 "   >
                            <option value="income">Income</option>
                            <option value="expense">Expenses</option>

                        </select>
                    </div>
                    <div className="mb-3">

                        <h2 className="mb-1 text-xl text-cyan-300">Category</h2>
                        <select name="category" value={formData.category} onChange={handlechange} className="outline-blue-500  text-md sm:text-xl border text-blue-400 rounded-md border-gray-400  px-2 sm:px-5 py-2 "  >
                            <option value="">Other</option>
                            <option value="food">Food</option>
                            <option value="travel" >Travel</option>
                            <option value="bills">Bills</option>
                            <option value="shopping">Shopping</option>
                            <option value="other">Other</option>

                        </select>




                    </div>
                </div>

                <div>
                    <h2 className="mb-1 text-xl text-cyan-300">Date</h2>
                    <input name="date" value={formData.date} onChange={handlechange}  className="outline-blue-500  text-md sm:text-xl border text-blue-300 border-gray-400 rounded-md px-8 py-2 " type="date" required />
                </div>

                <div className="flex justify-center items-center">

                    <button className=" text-2xl cursor-pointer bg-[#14243c]/10  border border-white/5 rounded-xl shadow-2xs  px-4 py-1 mt-10 text-cyan-300 ">Add +</button>
                </div>
            </form>
        </motion.div>
    )
}

export default Addtransaction;