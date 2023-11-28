const User=require('../models/user');

const addUser= async (req, res, next)=>{
    console.log(req.body)
    const u_name = req.body.user_name;
    const email = req.body.user_email;
    const data=await User.create({
        user_name:u_name,
        user_email:email
    }).then(result=>{
    console.log(result)
    }).catch(err=>console.log(err))
}

const displayAllUser=(req, res, next)=>{
    User.findAll().then((rows)=>{
        res.status(200).json({users:rows})
    }).catch((err)=>{
        console.log(err)
    })
}

const deleteUser=(req,res,next)=>{
    const id=req.params.id
    User.destroy({where:{id:id}})
    .then(()=>{
    res.redirect('/')
  }).catch((err)=>console.log(err))
}

const updateUser=(req,res,next)=>{
    const id=req.params.id
    const u_name = req.body.user_name;
    const email = req.body.user_email;
    User.update({
        user_name:u_name,
        user_email:email
    },{
        where:{id:id}
    })
}

module.exports={
    addUser,
    deleteUser,
    updateUser,
    displayAllUser
}