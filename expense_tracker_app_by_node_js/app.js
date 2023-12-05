require('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const PORT=process.env.PORT || 8000
const db=require('./utils/database')
app.use(cors())

app.use(express.json())

app.use(express.json({extended:false}))

const user_route=require('./routes/user_routes')
const expense_route=require('./routes/expense_routes')
const purchase_route=require('./routes/purchase_routes')
const forget_password_route=require('./routes/forget_password')

app.use(user_route)
app.use(expense_route)
app.use(purchase_route)
app.use(forget_password_route)

app.get('/',(req,res)=>{
    res.json({message:'Hello, from apii! Server is running for expense tracker application!!!!'});
})

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})