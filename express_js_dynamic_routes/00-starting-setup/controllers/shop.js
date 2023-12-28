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
  .then(cart=>{
    return cart.getProducts()
    .then(products=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products
      });
    })
    .catch(err=> console.log(err))
  })
  .catch(err=>console.log(err))
  
};

exports.postCart = (req,res,next)=>{
  const product_id= req.body.p_id
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart
    return cart.getProducts({where:{id:product_id}})
  })
  .then(products=>{
    let product;
    if(products.length>0){
      product=products[0];
    }
    let newQuantity=1;
    if(product){
      const oldQuantity=product.cartItem.quantity
      newQuantity=oldQuantity+1;
      return fetchedCart.addProduct(product,{through:{ quantity:newQuantity }})
    }
    return Product.findOne({where:{id:product_id}})
    .then(product=>{
      return fetchedCart.addProduct(product,{through:{ quantity:newQuantity }})
    })
    .then(()=>{
      res.redirect('/cart');
    })
    .catch(err=>console.log(err))
  })
  .catch()
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
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
