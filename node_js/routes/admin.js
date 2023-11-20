const express=require('express')
const router=express.Router()
router.get('/add_product',(req,res,next)=>{
    res.send("<form action='/admin/add_product' method='POST'><input type='text' name='title'><br/><input type='number' name='size'> <br/> <button type='submit'>Add product</button></form>")
})

router.post('/add_product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/shop/')
})

module.exports=router;