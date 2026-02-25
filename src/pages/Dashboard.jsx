import Balanceoverview from "../component/Balanceoverview";
import CategoryPieChart from "../component/CategoryPieChart";
import Summarycard from "../component/summarycard";


function Dashboard(){

    return(
        <div className=" flex flex-col  sm:flex-row justify-between">

            <div className="m-0 sm:m-10">

            <Balanceoverview />
            <Summarycard />

            </div>

            <div>
                <CategoryPieChart />
            </div>

          
          
        </div>
    )
}

export default Dashboard;