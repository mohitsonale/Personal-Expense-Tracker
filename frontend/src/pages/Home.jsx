import { motion } from "framer-motion";
import logo1 from "../assets/logo1.png";
import TextType from "../../animation/TextType";
import CircularText from "../../animation/CircularText";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate()
    return (
        <div>




            <motion.div
                className="flex flex-col  items-center text-center w-full min-h-screen justify-center"

                initial={{ opacity: 0.2, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
            >


                <div className="w-32 h-32 mb-10 mt-15 drop-shadow-[0_0_10px_#3b82f6] sm:mt-20 flex items-center justify-center">
                    <CircularText
                        text="PERSONAL*EXPENSES*TRACKER*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="custom-class"
                    />

                </div>


                <h1 className="text-4xl sm:text-6xl bg-gradient-to-l from-cyan-500/40 to-purple-400/40 bg-clip-text text-transparent font-extrabold">
                    <TextType
                        text={["Smarter Spending Starts Here."]}
                        typingSpeed={80}
                        showCursor
                    />
                </h1>


                <p className="mt-4 text-xl bg-gradient-to-l from-red-500/50 to-white/50 bg-clip-text text-transparent">
                    <TextType
                        text={[
                            "Track, analyze, and control your finances in real-time with smart insights."
                        ]}
                        typingSpeed={60}
                        showCursor
                    />
                </p>

                <div className="flex gap-6 mt-8 justify-center text-white">
                    <div className="glass-card p-4 text-center">
                        <h2 className="text-xl text-blue-300  font-bold">10K+</h2>
                        <p className="text-sm  text-gray-400">Transactions</p>
                    </div>

                    <div className="glass-card p-4 text-center">
                        <h2 className="text-xl text-blue-300  font-bold">99%</h2>
                        <p className="text-sm text-gray-400">Accuracy</p>
                    </div>

                    <div className="glass-card p-4 text-center">
                        <h2 className="text-xl text-blue-300  font-bold">24/7</h2>
                        <p className="text-sm text-gray-400">Tracking</p>
                    </div>
                </div>


                {/* <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-8 px-6 py-3 rounded-xl 
                    bg-blue-900 hover:bg-blue-800 
                    text-white font-medium 
                    transition duration-300 hover:scale-105 shadow-lg"
                >
                    Get Started 🚀
                </button> */}

            </motion.div>

        </div>
    );
}

export default Home;