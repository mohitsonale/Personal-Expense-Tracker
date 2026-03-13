import { Routes, Route } from "react-router-dom";


import Addtransaction from "./pages/Addtransaction";
import Dashboard from "./pages/Dashboard";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";

function App() {

  return (
    <div className="relative min-h-screen w-full  bg-black  overflow-hidden">

  
    


      <Navbar />
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