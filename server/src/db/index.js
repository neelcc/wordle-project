import mongoose from "mongoose";
import 'dotenv/config'


const ConnectDB = async ()=> {
    try {
        const ConnectionInstance = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb connected DB HOST : ${ConnectionInstance.connection.host}` );

    } catch (error) {

        console.log("MONGO DB connection error : ",error);
        process.exit(1)
    }
}


export default ConnectDB