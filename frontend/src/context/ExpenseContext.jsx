import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';



export const ExpenseContext = createContext();

function Expenseprovider({ children }) {

    const navigate = useNavigate()

    const [user, Setuser] = useState(null);
    const [showlogin, Setshowlogin] = useState(false);
    const [token, Settoken] = useState(localStorage.getItem("token"))

    const backendurl = import.meta.env.VITE_BACKEND_URL;





    const getuserdata = async () => {

        try {

            let { data } = await axios.get(backendurl + '/api/user/userdata', {
                headers: { token },

            });

            if (data.success) {
                Setuser(data.user);
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {

            toast.error(error.message)



        }
    }

    const getauthstate = async () => {

        try {

            let { data } = await axios.get(backendurl + '/api/auth/is-authentication',
                {
                    headers: { token },
                    withCredentials: true
                }
            );

            if (data.success) {
                // Setshowlogin(false);
                getuserdata()
            }

        } catch (error) {

            toast.error(error.message)

        }
    }

    // console.log("USER IN CONTEXT:", user);

    useEffect(() => {
        if (token) {
            // Setshowlogin(true);
            getauthstate();
        }
        else {
            Setshowlogin(false);
        }
    }, [token])


    const [transaction, Settransaction] = useState([]);

    useEffect(() => {
        if (!user) {
            Settransaction([]);
            return; 
        }
        const userKey = `transaction_${user.id}`;
        const savedata = localStorage.getItem(userKey);
        Settransaction(savedata ? JSON.parse(savedata) : []);

    }, [user]);


    useEffect(() => {

        if (!user) {
            return;
        }
        
        const userKey = `transaction_${user.id}`;
        localStorage.setItem(userKey, JSON.stringify(transaction));

    }, [transaction, user]);


    const addTransaction = (transaction) => {
        Settransaction((prev) => [...prev, transaction])
    }

    const totalIncome = transaction
        .filter(t => t.type === "income" || !t.type)
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transaction
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    const Cleartransaction = () => {
        Settransaction([]);

        if (user) {

            localStorage.removeItem(`transaction_${user.id}`)
        }
        navigate("/")
    }

    const deleteTransaction = (id) => {

        Settransaction(prev =>
            prev.filter(t => t.id !== id)
        );

    }

    const loadUserTransactions = (userId) => {
        const userKey = `transaction_${userId}`;
        const savedata = localStorage.getItem(userKey);
        Settransaction(savedata ? JSON.parse(savedata) : []);
    }

    const logout = () => {

        const confirmlogout = window.confirm("Are you really want to logout")

        if (!confirmlogout)
            return;


        localStorage.removeItem("token")
        Settoken("")
        Setuser(null)
        Setshowlogin(true)
        // Settransaction([]);
        navigate("/")
        toast.success("Logged out successfully")
    }
    const value = {
        transaction,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpense,
        totalBalance,
        Cleartransaction,
        backendurl,
        loadUserTransactions,
        showlogin,
        Settransaction,
        Setshowlogin,
        token,
        Settoken,
        user,
        Setuser,
        getuserdata,
        logout

    }

    return (

        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )


}

export default Expenseprovider;