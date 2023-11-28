const productController=require('../controllers/productController');

const router=require('express').Router()

router.post('/addProduct',productController.addProduct)

router.get('/allProducts',productController.getAllProducts)

router.get('/getProduct/:id',productController.getOneProduct)

router.put('/updateProduct/:id',productController.updateProduct)

router.delete('/deleteProduct/:id',productController.deleteProduct)

router.get('/publishedProduct',productController.getPublishedProduct)

module.exports=router