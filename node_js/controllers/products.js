const path=require('path')
const rootDir=require('../util/path')
const Product=require('../models/product')


exports.getAddProduct=(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'../','views','add_product.html'))
    res.sendFile(path.join(rootDir,'views','add_product.html'))
}

exports.postAddProduct=(req,res,next)=>{
    const product=new Product(req.body.title)
    product.save();
    res.redirect('/shop/')
}

exports.gerProducts=(req,res,next)=>{
    const products=Product.fetchAll();
    res.sendFile(path.join(rootDir,'views','shop.html'));
}

exports.contactus=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contact_us.html'));
}

exports.success=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'));
}

exports.error_handling=(req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'))
}