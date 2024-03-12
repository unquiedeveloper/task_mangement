import mongoose from "mongoose"

export const dbConnection = (req,res)=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Task_mangement"

    }).then(()=>{
        console.log("connection successfull");
    }).catch(()=>{
        console.log(`connection failed ${err}`);
    })
   
}