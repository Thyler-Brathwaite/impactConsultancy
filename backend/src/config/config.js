import mongoose from 'mongoose'

export const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Succesfully")
    }
    catch(error){
        console.error("There was an error starting the database");
    }
}
