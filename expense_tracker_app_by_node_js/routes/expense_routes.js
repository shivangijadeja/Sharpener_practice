const expense_controller=require('../controllers/expense_controller');
const auth=require('../middleware/auth')

const router=require('express').Router()

router.post('/expense/add-expense',auth.authenticate,expense_controller.addExpense)

router.get('/expense/display-expense',auth.authenticate,expense_controller.getAllExpense)

router.delete('/expense/delete-expense/:id',auth.authenticate,expense_controller.deleteExpense)

router.get('/expense/show-leaderboard',expense_controller.showLeaderboard)

module.exports=router