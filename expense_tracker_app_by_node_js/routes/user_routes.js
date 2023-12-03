const user_controller=require('../controllers/user_controller');

const router=require('express').Router()

router.post('/user/add-user',user_controller.addUser)

router.get('/user/all-users',user_controller.getAllUser)

router.post('/user/login',user_controller.testUser)

module.exports=router