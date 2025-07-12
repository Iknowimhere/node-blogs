import mongoose from "mongoose";

async function db(){
    try {
      await mongoose.connect(process.env.MONGODB_URI)  
      console.log("db connected");
    } catch (error) {
        console.log("mongoose error",error.message);
    }
}

export default db;