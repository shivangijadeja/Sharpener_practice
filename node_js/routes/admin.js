const express=require('express')
const path=require('path')
const router=express.Router()
const rootDir=require('../util/path')

router.get('/add_product',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'../','views','add_product.html'))
    res.sendFile(path.join(rootDir,'views','add_product.html'))
})

router.post('/add_product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/shop/')
})

module.exports=router;