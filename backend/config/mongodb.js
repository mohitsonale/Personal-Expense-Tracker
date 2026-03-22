import mongoose from "mongoose"

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "PERSONAL_TRACKER"
        })
        console.log("MongoDB Connected Successfully ✅");
    } catch (error) {
        console.log("MongoDB Error ❌", error.message);
    }


}

export default connectDB;