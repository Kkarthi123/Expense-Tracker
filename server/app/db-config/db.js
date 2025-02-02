const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
        const dbConnection  = await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB is connected successfully on ---> " + dbConnection.connection.host)
    }
    catch(err){
        console.log("DB connection failed" + err);
        process.exit();
    }
    
}

module.exports = connectDb;