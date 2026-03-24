import { motion } from "framer-motion";
import logo1 from "../assets/logo1.png";
import TextType from "../../animation/TextType";
import CircularText from "../../animation/CircularText";

function Home() {
    return (
        <div>



          
            <motion.div
                className="flex flex-col items-center text-center w-full min-h-screen justify-center"

                initial={{ opacity: 0.2, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
            >


                <div className="w-32 h-32 mb-10 flex items-center justify-center">
                      <CircularText
                text="PERSONAL*EXPENSES*TRACKER*"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
            />

                    {/* <motion.img
                        src={logo1}
                        alt="logo"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "linear"
                        }}
                        className="w-full h-full cursor-pointer shadow-blue-300 shadow-md object-cover rounded-full"
                    /> */}
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
                            "Monitor your finances with real time insights and beautiful analytics."
                        ]}
                        typingSpeed={60}
                        showCursor
                    />
                </p>

            </motion.div>

        </div>
    );
}

export default Home;