const User=require('../models/user')
const ChatHistory=require('../models/chatHistory')
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

function generateAccessToken(id,user_name){
    return jwt.sign({user_id:id,user_name:user_name},'secretkey')
}

const testUser=async (req,res,next)=>{
    const email = req.body.email;
    const pwd=req.body.password;
    const result=await User.findOne({
        where:{'email':email}
    })
    if(result!=null){
        bcrypt.compare(pwd,result.dataValues.password,(err,response)=>{
            if(err){
                res.status(500).send("Something went wrong")
            }
            if(response==true){
                res.status(200).json({message:"User login succesfully",token:generateAccessToken(result.dataValues.id,result.dataValues.user_name)});
            }
            else{
                res.status(401).send("User not authorised");
            }
        })
    }
    else{
        res.status(404).send("User not found");
    }
}

const postMessage=async (req,res,next)=>{
    const user_id=req.body.user_id
    const message=req.body.message
    try{
        const post_msg=await ChatHistory.create({
            userId:user_id,
            message:message
        })
        res.status(201).json({message:"Message saved successfully!!!"})
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:err})
    }

}

const getAllMessages=async (req,res,next)=>{
    try{
        const lastMessageId = request.query.lastMessageId || 0;
        const fetch_all_msgs=await ChatHistory.findAll({
            include: [
                {
                    model:User,
                    attibutes: ['id','name', 'message', 'date_time']
                }
            ],
            order: [['date_time', 'ASC']],
            where: {
                id: {
                    [Op.gt]: lastMessageId
                }
            }
        })
        const chats = fetch_all_msgs.map((ele) => {
            return {
                messageId: ele.dataValues.id,
                message: ele.dataValues.message,
                name: ele.dataValues.user.dataValues.user_name,
                userId: ele.dataValues.userId,
                date_time: ele.dataValues.date_time
            }
        })
        const all_chat=await chats
        res.status(200).json({messages:all_chat})
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:err})
    }
}

module.exports={
    getAllUsers,
    addUser,
    testUser,
    postMessage,
    getAllMessages,
}