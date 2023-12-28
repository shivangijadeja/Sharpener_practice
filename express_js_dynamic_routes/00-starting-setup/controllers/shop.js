const Product = require('../models/product');
// const Shop=require('../models/cart');
// const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>console.log(err))
};

exports.getProduct=(req,res,next)=>{
  const proId=req.params.productId;
  Product.findOne(proId).then((product)=>{
    res.render('shop/product-detail',{
      product:product,
      pageTitle:product.title,
      path:'/products'
    })
  }).catch(err=>console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products
      });
    })
    .catch(err=> console.log(err))  
};

exports.postCart = (req,res,next)=>{
  const product_id= req.body.p_id
  Product.findOne(product_id)
  .then(
    product=>{
      req.user.addToCart(product)
      res.redirect('/cart');
    }
  )
  .then(result=>{
    console.log(result)
  })
  .catch()
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteProductFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

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
