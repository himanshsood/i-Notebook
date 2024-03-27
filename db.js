const mongoose = require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/inotebook';

const connectToMongo=async ()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("connected to mongo successfully")
    }catch(err){
        console.log("error connecting mongo");
    }
}

module.exports=connectToMongo;



//connection string mongodb://127.0.0.1:27017/inotebook