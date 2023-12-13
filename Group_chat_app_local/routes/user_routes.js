const userController=require('../controllers/user_controller');

const router=require('express').Router()

router.get('/user/all-users',userController.getAllUsers)

router.post('/user/add-user',userController.addUser)

module.exports=router