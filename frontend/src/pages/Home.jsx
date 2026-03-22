import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";

function Home() {

    const navigate=useNavigate()
    return (
        <div>


            <motion.div className="flex flex-col items-center text-center selection:text-green-300 selection:bg-black w-full min-h-screen justify-center"

                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={true}

            >
                <div  className="w-32 h-32 mb-10 flex  items-center justify-center">
                    <img  className="w-full h-full  cursor-pointer  hover:shadow-blue-300 shadow-md hover:scale-105 hover:rotate-180
                      transition-all duration-800 object-cover rounded-full" src={logo1} alt="logo" />
                </div>
                <h1 className="text-4xl sm:text-6xl bg-gradient-to-l from-cyan-500/40 to-purple-400/40 bg-clip-text text-transparent font-extrabold">
                    Smarter Spending Starts Here.
                </h1>

                <p className="mt-4 text-xl  bg-gradient-to-l from-red-500/50 to-white/50 bg-clip-text text-transparent">
                    Monitor your finances with real time insights and beautiful analytics.
                </p>
            </motion.div>

        </div>
    )
}

export default Home;