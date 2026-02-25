import { Routes,Route } from "react-router-dom";

import Addtransaction from "./pages/Addtransaction";
import Dashboard from "./pages/Dashboard";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";

function App(){

  return(
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-purple-400">
    <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/addtransaction" element={<Addtransaction />} />
     </Routes>
    </div>
  )
}

export default App;