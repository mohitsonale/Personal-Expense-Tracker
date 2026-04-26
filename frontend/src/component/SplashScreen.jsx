import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import symbol1 from "../assets/symbol1.png";
import LightRays from "../../animation/LightRays";

function SplashScreen({ onFinish }) {
    const [phase, setPhase] = useState(0); 
    const [exit, Setexit] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 700),  
            setTimeout(() => setPhase(2), 1400),  
            setTimeout(() => setPhase(3), 2300),  
            setTimeout(() => onFinish(), 3500)    
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100]  bg-black  overflow-hidden">

            <div className="absolute inset-0 -z-10">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={1}
                    rayLength={6}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={0.7}
                    saturation={2}
                />
            </div>

            {/* LEFT PANEL */}
            <motion.div
                initial={{ x: 0 }}
                animate={phase >= 3 ? { x: "-100%" } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }} // slower
                className="absolute left-0 top-0 w-1/2 h-full bg-black"
            />

            {/* RIGHT PANEL */}
            <motion.div
                initial={{ x: 0 }}
                animate={phase >= 3 ? { x: "100%" } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }} // slower
                className="absolute right-0 top-0 w-1/2 h-full bg-black"
            />

            {/* CENTER LOGO */}
            {phase < 3 && (
                <motion.img
                    src={symbol1}
                    className="w-35 absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
                    animate={{
                        scale: phase >= 1 ? 1.2 : 0.8,   // first scale
                        rotate: phase >= 2 ? 360 : 0,    // then rotate
                        opacity: 1
                    }}
                    transition={{ duration: 0.8 }}
                />
            )}
            
        </motion.div>
    );
}

export default SplashScreen;