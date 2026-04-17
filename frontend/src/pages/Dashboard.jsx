import Balanceoverview from "../component/Balanceoverview";
import CategoryPieChart from "../component/CategoryPieChart";
import Summarycard from "../component/summarycard";
import { motion } from "framer-motion"


function Dashboard() {

    return (
        <motion.div className="min-h-screen w-full flex flex-col lg:flex-row gap-8 p-4 sm:p-8 lg:p-10  text-black dark:text-white  transition-colors duration-500"

            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={true}

        >

            <div className="w-full mt-10  lg:w-2/3 space-y-6">

                <Balanceoverview />
                <Summarycard />

            </div>

            <div className="w-full mt-10 lg:w-1/3 ">
                <CategoryPieChart />
            </div>



        </motion.div>
    )
}

export default Dashboard;