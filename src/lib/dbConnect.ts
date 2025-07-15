import mongoose from "mongoose";
type isConnectedObject = {
    isConnected?: number;
}

const connection : isConnectedObject = {};
const dbConnect  = async():Promise<void>=>{
    if(connection.isConnected){
        console.log("Already connected to the database");
        return;
    }
    try{
         const db = await mongoose.connect(process.env.MONGO_URL||"");
         connection.isConnected = db.connections[0].readyState;
         console.log("Connected to the database");
    }catch(error){
        console.error("Error connecting to the database:", error);
    }
}
export default dbConnect;
