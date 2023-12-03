expense_controller=require('../controllers/expense_controller');

const router=require('express').Router()

router.post('/expense/add-expense',expense_controller.addExpense)
router.get('/expense/display-expense',expense_controller.getAllExpense)

// router.post('/user/login',user_controller.testUser)
// 

module.exports=router