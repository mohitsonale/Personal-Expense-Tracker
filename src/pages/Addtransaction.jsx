import { useNavigate } from "react-router-dom";




function Addtransaction(){

    const navigate=useNavigate()

    
    
    return(

        <div>
            <h1 onClick={()=>navigate('/addtransaction')}>Add Transacti</h1>
            
            
        </div>
    )
}

export default Addtransaction;