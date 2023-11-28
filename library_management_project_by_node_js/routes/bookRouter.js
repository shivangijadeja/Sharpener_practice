const bookController=require('../controllers/bookController');

const router=require('express').Router()

router.post('/add-book',bookController.addBook)

router.get('/get-all-books',bookController.getAllBooks)

router.put('/update-product/:id',bookController.updateBook)

module.exports=router