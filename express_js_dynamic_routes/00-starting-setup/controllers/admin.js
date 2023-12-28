const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // req.user.createProduct(
  //   {
  //     title:title,
  //     price:price,
  //     imageUrl:imageUrl,
  //     description:description
  // })
  const product=new Product(title,imageUrl,price,description,null,req.user._id)
  product.save().then(result=>{
    console.log("created products")
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  const proId=req.params.productId;
  // Product.findOne({where:{id:proId}})
  Product.findOne(proId)
  .then((product)=>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing:editMode,
      product:product
    });
  }).catch(err=>console.log(err))
  
};

exports.getDeleteProduct = (req, res, next) => {
  const proId=req.params.productId;
  Product.deleteById(proId)
  .then(()=>{
    res.redirect('/admin/products')
  }).catch((err)=>console.log(err))
};

exports.postEditProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updatedDes=req.body.description;
  
  const updated_product=new Product(updatedTitle,updatedImageUrl,updatedPrice,updatedDes,prodId)
  updated_product.save().then(result=>{
    console.log('Product Updated')
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
}

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  Product.fetchAll()
  .then((rows)=>{
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>console.log(err))
};
