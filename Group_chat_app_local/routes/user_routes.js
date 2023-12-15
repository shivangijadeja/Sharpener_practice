const userController=require('../controllers/user_controller');
const userAuthenticate=require('../middleware/user_authentication')

const router=require('express').Router()

router.get('/user/all-users',userController.getAllUsers)

router.post('/user/add-user',userController.addUser)

router.post('/user/login',userController.testUser)

router.post('/post-meesage',userController.postMessage)

router.get('/get-all-messages',userAuthenticate.authenticate,userController.getAllMessages)

module.exports=router