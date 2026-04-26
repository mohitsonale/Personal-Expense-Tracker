import LightRays from "../../animation/LightRays";

function Loader() {

    return (

        <div className="flex items-center  fixed inset-0 z-[100]  bg-black  overflow-hidden   justify-center min-h-screen ">
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

            <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-blue-500 border-t-transparent  rounded-full animate-spin"></div>
            <p className="text-white text-md sm:text-xl">Loading...</p>
        </div>
    )
}

export default Loader;