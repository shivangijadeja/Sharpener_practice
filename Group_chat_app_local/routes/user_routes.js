const userController=require('../controllers/user_controller');

const router=require('express').Router()

router.get('/user/all-users',userController.getAllUsers)

router.post('/user/add-user',userController.addUser)

router.post('/user/login',userController.testUser)

router.post('/post-meesage',userController.postMessage)

router.get('/get-all-messages',userController.getAllMessages)

module.exports=router