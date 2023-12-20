const userController=require('../controllers/user_controller');

const userAuthentication=require('../middleware/authentication')
const multerMiddleware=require('../middleware/multer')
const upload=multerMiddleware.multer.single('image')

const router=require('express').Router()

router.get('/user/all-users',userController.getAllUsers)

router.post('/user/add-user',userController.addUser)

router.post('/user/login',userController.testUser)

router.post('/post-meesage',userController.postMessage)

router.get('/get-all-messages',userController.getAllMessages)

router.post('/add-group',userController.addGroup)

router.get('/get-all-groups', userAuthentication.authenticate ,userController.getAllGroups)

router.get('/get-group-messages',userController.getGroupMessages)

router.post('/post-common-meesage',userController.postCommonMessage)

router.get('/get-group-details',userController.getGroupDetails)

router.put('/edit-group/:id',userController.editGroup)

router.post('/post-common-image',upload,userController.postCommonImage)

router.post('/post-group-image',upload,userController.postGroupImage)

module.exports=router