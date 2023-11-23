const Product = require('../models/product');
const Shop=require('../models/cart');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>console.log(err))
};

exports.getProduct=(req,res,next)=>{
  const proId=req.params.productId;
  Product.findById(proId).then(([product])=>{
    res.render('shop/product-detail',{
      product:product[0],
      pageTitle:product.title,
      path:'/products'
    })
  }).catch(err=>{
    console.log(err)
  })
  
}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>console.log(err))
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req,res,next)=>{
  const product_id= req.body.p_id
  Product.findById(product_id,(product)=>{
    Cart.addProduct(product_id,product.price);
  })
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
