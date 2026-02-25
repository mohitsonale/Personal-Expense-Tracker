import Balanceoverview from "../component/Balanceoverview";
import CategoryPieChart from "../component/CategoryPieChart";
import Summarycard from "../component/summarycard";
import { motion } from "framer-motion"


function Dashboard() {

    return (
        <motion.div className=" flex flex-col  sm:flex-row justify-between"

            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={true}

        >

            <div className="m-0 sm:m-10">

                <Balanceoverview />
                <Summarycard />

            </div>

            <div>
                <CategoryPieChart />
            </div>



        </motion.div>
    )
}

export default Dashboard;