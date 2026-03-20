import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const ExpenseContext = createContext();

function Expenseprovider({ children }) {

    const navigate=useNavigate()

    const [transaction, Settransaction] = useState(() => {

        const savedata = localStorage.getItem("transaction");
        return savedata ? JSON.parse(savedata) : [];
    })

   

    useEffect(() => {

        localStorage.setItem("transaction", JSON.stringify(transaction));

    }, [transaction]);


    const addtransaction = (transaction) => {
        Settransaction((prev) => [...prev, transaction])
    }

  const totalIncome = transaction
  .filter(t => t.type === "income" || !t.type)
  .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transaction
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    const Cleartransaction=()=>{
        Settransaction([]);
        localStorage.removeItem("transaction")
        navigate("/")
    }

    const deleteTransaction=(id)=>{

       Settransaction(prev =>
    prev.filter(t => t.id !== id)
  );

    }

    return (

        <ExpenseContext.Provider value={{ transaction, addtransaction,deleteTransaction,totalIncome,totalExpense,totalBalance,Cleartransaction, }}>
            {children}
        </ExpenseContext.Provider>
    )


}

export default Expenseprovider;