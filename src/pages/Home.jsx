import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
                    <img onClick={()=>navigate("/dashboard")} className="w-full h-full cursor-pointer   hover:shadow-xl hover:scale-105 transition-all duration-500 object-cover rounded-full" src="/src/assets/logo.png" alt="" />
                </div>
                <h1 className="text-4xl sm:text-6xl bg-gradient-to-l from-cyan-500 to-purple-400 bg-clip-text text-transparent font-extrabold">
                    Smarter Spending Starts Here.
                </h1>

                <p className="mt-4 text-xl  bg-gradient-to-l from-red-500 to-white bg-clip-text text-transparent">
                    Monitor your finances with real time insights and beautiful analytics.
                </p>
            </motion.div>

        </div>
    )
}

export default Home;