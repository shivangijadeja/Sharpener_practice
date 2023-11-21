const path=require('path')
const express=require('express')
const router=express.Router()
const rootDir=require('../util/path')

router.use('/success',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'));
})

router.use('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contact_us.html'));
})



module.exports=router