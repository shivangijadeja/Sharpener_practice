const userController=require('../controllers/userController');

const router=require('express').Router()

router.post('/admin/add-user',userController.addUser)

router.get('/admin/get-all-user',userController.displayAllUser)

router.delete('/admin/delete-user/:id',userController.deleteUser)

router.put('/admin/update-user/:id',userController.updateUser)

module.exports=router