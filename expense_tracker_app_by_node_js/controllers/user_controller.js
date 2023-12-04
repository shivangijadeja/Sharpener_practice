const db=require('../utils/database')
const bcrypt=require('bcrypt'); 
const jwt=require('jsonwebtoken')

const addUser=(req,res)=>{
    try{
        const u_name = req.body.user_name;
        const email = req.body.email;
        const pwd=req.body.password;
        const saltrounds=5 
        bcrypt.hash(pwd,saltrounds,async(err,hash)=>{
            let password={pwd:hash}
            await db.execute('INSERT INTO USER (user_name,email,password)  VALUES (?,?,?)' , [u_name,email,password.pwd])
            res.status(201).json({message:"Successfully user createds"})
        })
    }
    catch(err){
        console.log(err)
    }
}

const getAllUser=(req,res)=>{
    db.execute('SELECT * FROM USER').then((result)=>{
        res.status(200).json({users:result})
    })
}

function generateAccessToken(id,is_premium_user){
    return jwt.sign({user_id:id,is_premium_user},'secretkey')
}

const testUser=async (req,res)=>{
    const email = req.body.email;
    const pwd=req.body.password;
    const result=await db.execute(`select * from user where email='${email}'`)
    if(result[0].length>0){
        bcrypt.compare(pwd,result[0][0].password,(err,response)=>{
            if(err){
                res.status(500).send("Something went wrong")
            }
            if(response==true){
                res.status(200).json({message:"User login succesfully",token:generateAccessToken(result[0][0].id,result[0][0].is_preminum_user)});
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

module.exports={
    addUser,
    getAllUser,
    testUser,
}