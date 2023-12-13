const User=require('../models/user')
const bcrypt=require('bcrypt'); 
const jwt=require('jsonwebtoken')

const getAllUsers= async (req,res,next)=>{
    try{
        const get_users=await User.findAll()
        res.status(200).json({users:get_users})
    }
    catch(err){
        console.log(err)
    }
}

const addUser=async (req,res,next)=>{
    const user_name=req.body.user_name
    const email=req.body.email
    const phone_number=req.body.phone_number
    const pwd=req.body.password
    const saltrounds=5 

    try{
        bcrypt.hash(pwd,saltrounds,async(err,hash)=>{
            let password={pwd:hash}
            const add_user=await User.create({
                user_name:user_name,
                email:email,
                phone_number:phone_number,
                password:password.pwd
            })
            res.status(201).json({message:"User created successfully!!!"})
        })
    }
    catch{

    }
}

module.exports={
    getAllUsers,
    addUser
}