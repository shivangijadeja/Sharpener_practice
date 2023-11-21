const path=require('path')
const express=require('express')
const router=express.Router()
const rootDir=require('../util/path')
const productController=require('../controllers/products')

router.use('/success',productController.success)

router.use('/',productController.contactus)

module.exports=router