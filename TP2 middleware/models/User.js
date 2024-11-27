const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        require:true,
        minlength:6
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})


module.exports=mongoose.model('User',userSchema)