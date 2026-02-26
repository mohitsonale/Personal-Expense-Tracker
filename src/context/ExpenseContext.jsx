import { createContext, useEffect, useState } from "react";



export const ExpenseContext = createContext();

function Expenseprovider({ children }) {

    // loaclstorage se intial data lo
    const [transaction, Settransaction] = useState(() => {

        const savedata = localStorage.getItem("transaction");
        return savedata ? JSON.parse(savedata) : [];
    })

    //  jab bhi transactions change ho toh  localstrorage se data lo

    useEffect(() => {

        localStorage.setItem("transaction", JSON.stringify(transaction));

    }, [transaction]);

    // add transaction function

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
    }

    return (

        <ExpenseContext.Provider value={{ transaction, addtransaction,totalIncome,totalExpense,totalBalance,Cleartransaction }}>
            {children}
        </ExpenseContext.Provider>
    )


}

export default Expenseprovider;