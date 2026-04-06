import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

export const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
    const navigate = useNavigate();

    const [user, Setuser] = useState(null);
    const [showlogin, Setshowlogin] = useState(false);
    const [token, Settoken] = useState(localStorage.getItem("token"));
    const [transaction, Settransaction] = useState([]);

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    console.log("BACKEND URL:", backendurl);


  
    const getuserdata = async () => {
        try {
            let { data } = await axios.get(`${backendurl}/api/user/userdata`, {
                headers: { token },
            });

            if (data.success) {
                Setuser(data.user);
                loadUserTransactions(data.user._id);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getauthstate = async () => {
        try {
            let { data } = await axios.get(`${backendurl}/api/auth/is-authentication`, {
                headers: { token },
                withCredentials: true
            });

            if (data.success) {
                Setshowlogin(false);
                getuserdata();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) getauthstate();
        else Setshowlogin(false);
    }, [token]);


    const loadUserTransactions = (userId) => {
        if (!userId) {
            Settransaction([]);
            return;
        }

        const userKey = `transaction_${userId}`;
        const savedata = localStorage.getItem(userKey);
        Settransaction(savedata ? JSON.parse(savedata) : []);
    };

    const addTransaction = (newTransaction) => {
        
        
        Settransaction(prev => {
            const updated = [...prev, newTransaction];
            
            if(user?._id){

                const userKey = `transaction_${user._id}`;
                localStorage.setItem(userKey, JSON.stringify(updated));
            }


            return updated;
        });
    };

    console.log("USER ID:", user?._id);
    console.log("KEY:", `transaction_${user?._id}`);

    const deleteTransaction = (id) => {
        if (!user?._id) return;
        Settransaction(prev => {
            const updated = prev.filter(t => t.id !== id);

           
                const userKey = `transaction_${user._id}`;
                localStorage.setItem(userKey, JSON.stringify(updated));
          

            return updated;
        });
    };

    const Cleartransaction = () => {
        Settransaction([]);
        if (user) {
            const userKey = `transaction_${user._id}`;
            localStorage.removeItem(userKey);
        }
        navigate("/");
    };

    const logout = () => {
        if (!window.confirm("Are you really want to logout")) return;

        localStorage.removeItem("token");
        Settoken("");
        Setuser(null);
        Settransaction([]);
        Setshowlogin(true);
        navigate("/");
        toast.success("Logged out successfully");
    };


    const totalIncome = transaction
        .filter(t => t.type === "income" || !t.type)
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transaction
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;


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
    };

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
}

export default ExpenseProvider;