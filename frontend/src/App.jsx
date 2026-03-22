import { Routes, Route } from "react-router-dom";


import Addtransaction from "./pages/Addtransaction";
import Dashboard from "./pages/Dashboard";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import { useContext } from "react";
import { ExpenseContext } from "./context/ExpenseContext";
import Login from "./component/Login";
import { ToastContainer } from "react-toastify";

function App() {

  const {showlogin}=useContext(ExpenseContext)

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">

  
    

     <ToastContainer / >
      <Navbar />
      {
           showlogin   && <Login />
      }
      <div className="px-4 sm:px-8  lg:px-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addtransaction" element={<Addtransaction />} />
        </Routes>
      </div>

    </div>
  );

}

export default App;