const mongoose = require('mongoose');
const MONGO_URI="mongodb+srv://hedi:hedi645321@cluster0.5wekk.mongodb.net/";
const PORT=3000;


const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        .then(()=> console.log("Established connection"));
    }catch(error){
        console.error('Erreur de connexion');
        process.exit(1);
    }
};

module.exports=connectDB
