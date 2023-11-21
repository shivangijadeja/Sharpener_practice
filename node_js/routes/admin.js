const express=require('express')
const path=require('path')
const router=express.Router()
const rootDir=require('../util/path')
const productController=require('../controllers/products')

router.get('/add_product',productController.getAddProduct)

router.post('/add_product',productController.postAddProduct)

module.exports=router;