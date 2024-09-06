import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}
const connection:ConnectionObject={}

async function dbConnect():Promise<void>{
   
    try{
        const db=await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ritammajumder2025:i8msBfRjIdAvyUvX@astroauth.uw5cm.mongodb.net/?retryWrites=true&w=majority&appName=astroAuth')
        connection.isConnected=db.connections[0].readyState
        console.log("Data Base Connected")
    }catch(c){
        console.log("Connection failed")
        process.exit(1)
    }
}
export default dbConnect;