const purchase_controller=require('../controllers/purchase_controller');
const auth=require('../middleware/auth');

const router=require('express').Router()

router.get('/purchase/premiummembership',auth.authenticate,purchase_controller.purchasePremium)

router.post('/purchase/updatetransactionstatus',auth.authenticate,purchase_controller.updateTransactionStatus)

module.exports=router