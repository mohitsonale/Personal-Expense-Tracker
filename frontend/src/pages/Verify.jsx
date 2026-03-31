import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ExpenseContext } from "../context/ExpenseContext";

function Verify() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  const {backendurl}=useContext(ExpenseContext);
  
  useEffect(() => {
    axios.get(`${backendurl}/api/auth/verify/${token}`)
      .then(res => {
        setMessage(res.data);
        toast.success("Email verified successfully ✅");
      })
      .catch(() => {
        setMessage("Verification failed ❌");
        toast.error("Verification failed ❌");
      });
  }, []);

  return (
    <div> 
      {/* <h2>{message}</h2> */}
    </div>
  );
}

export default Verify;