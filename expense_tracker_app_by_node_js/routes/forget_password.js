const forget_password_controller=require('../controllers/forget_password');
const router=require('express').Router()

router.post('/password/forgotpassword',forget_password_controller.sendEmail);

router.get('/password/resetpassword/:id',forget_password_controller.resetPassword);

router.get('/password/updatepassword/:id',forget_password_controller.updatePassword)

module.exports=router