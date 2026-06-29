import mongoose from "mongoose";

const connToDB = async function () {
    try {
        const dbInstance = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`DB connected successful `, dbInstance.connection.host);
    } catch (error: any) {
        console.log("Error in connecting DB:", error.message);
        process.exit(1);
    }
};

export default connToDB;
