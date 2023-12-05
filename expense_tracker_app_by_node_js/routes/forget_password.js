const forget_password_controller=require('../controllers/forget_password');
const router=require('express').Router()

router.post('/password/forgotpassword',forget_password_controller.sendEmail)

module.exports=router