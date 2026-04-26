import { Routes, Route } from "react-router-dom";
import LightRays from "../animation/LightRays";
import Navbar from "./component/Navbar";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "./context/ExpenseContext";
import Login from "./component/Login";
import { ToastContainer } from "react-toastify";
import SplashScreen from "./component/SplashScreen";
import {lazy} from "react";
import { Suspense } from "react";
import Loader from "./component/Loader";

const Home=lazy(()=>import("./pages/Home"));
const Dashboard=lazy(()=>import("./pages/Dashboard"));
const Addtransaction=lazy(()=>import("./pages/Addtransaction"));
const Verify=lazy(()=>import("./pages/Verify"));
const ForgotPassword=lazy(()=>import("./pages/ForgotPassword"));
const ResetPassword=lazy(()=>import("./pages/ResetPassword"));

function App() {
  

  const { showlogin } = useContext(ExpenseContext)

  const [loading,Setloading]=useState(
    !sessionStorage.getItem("splashShow")
  );

  useEffect(()=>{

    setTimeout(()=>{
      Setloading(false);
    },4000);
  },[])

  return (
    <>

    {
      loading ?(
        <SplashScreen onFinish={()=> {sessionStorage.setItem("splashShow","true"); Setloading(false)}} />
      )
      
      :
    (

      <div className={ "relative min-h-screen w-full bg-black  transition-colors duration-500 overflow-hidden"}>
{/* "relative min-h-screen w-full bg-[#cbb89d]/50 transition-colors duration-500 overflow-hidden" */}
   
        <div className="absolute inset-0 z-0 pointer-events-none">
         
        <LightRays
          raysOrigin="top-center"
          raysColor= "#ffffff" 
          raysSpeed={1}
          lightSpread={1}
          rayLength={6}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={0.7}
          saturation={2}
          />
      </div>
    
  
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="custom-toast"
        />
      <Navbar className="relative z-10 " />
      {
        showlogin && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
            <Login />
          </div>
        )}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12">
        <Suspense fallback={<Loader />}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addtransaction" element={<Addtransaction />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        </Suspense>
      </div>

    </div>
  )
    }
 </>
  );

}

export default App;