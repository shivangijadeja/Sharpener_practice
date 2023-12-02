const db=require('../utils/database')

const addUser=(req,res)=>{
    const u_name = req.body.user_name;
    const email = req.body.email;
    const pwd=req.body.password;
    db.execute('INSERT INTO USER (user_name,email,password)  VALUES (?,?,?)' , [u_name,email,pwd]).then(
        (res)=>{
            console.log(res)
        }
    ).catch((err)=>console.log(err))
}

const getAllUser=(req,res)=>{
    db.execute('SELECT * FROM USER').then((result)=>{
        res.status(200).json({users:result})
    })
}

module.exports={
    addUser,
    getAllUser
}