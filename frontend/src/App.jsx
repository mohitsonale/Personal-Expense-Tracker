import { Routes, Route } from "react-router-dom";
import LightRays from "../animation/LightRays";
import Addtransaction from "./pages/Addtransaction";
import Dashboard from "./pages/Dashboard";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import { useContext } from "react";
import { ExpenseContext } from "./context/ExpenseContext";
import Login from "./component/Login";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/Resetpassword";

function App() {

  const { showlogin } = useContext(ExpenseContext)

  return (
    <div className="relative min-h-screen w-full bg-black  overflow-hidden">


      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
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

      <ToastContainer />
      <Navbar className="relative z-10 " />
      {
        showlogin && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
            <Login />
          </div>
        )}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addtransaction" element={<Addtransaction />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>

    </div>
  );

}

export default App;