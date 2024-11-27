const user=require('../models/User');

const mongoose= require('mongoose');

const getusers = async (req, res) =>{
    const users = await user.find({}).sort({createdAt:-1});
    res.status(200).json(users);
}


const createuser = async(req, res)=>{
    const {username,password}=req.body;
    const user1=await user.findOne({username});
    if(!user1) return res.status(404)
    
    try{
        const newuser=new user({username,password});
        await newuser.save();
        res.status(400).json({msg1:'créé avec succés'+username+" "+password});
    }catch(error){
        res.status(400).json({msg2:error.message+username+" "+password});
    }
    
}

const deletetuser = async (req, res) =>{
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) 
        return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
}

const updateuser = async (req, res) =>{
    const {id,username,password}=req.body;
    const user1=await user.findOne({id});
    if(!user1) return res.status(404)

    try{
        const user1=await user.findOneAndUpdate({_id:id},{
            ...req.body
        })
        res.status(400).json({msg1:'updated avec succés '+username+" "+password});
    }catch(error){
        res.status(400).json({msg2:error.message+username+" "+password});
    }
}


module.exports={
    createuser,
    getusers,
    deletetuser,
    updateuser
}