const express=require('express')
const cors=require('cors')
const app=express()
const sequelize=require('./utils/database')
// var corOptions={
//     origin:"https://localhost:3000"
// }

app.use(cors())

app.use(express.json())

// app.use(express.urlencoded({extended:true}))

app.use(express.json({extended:false}))

const routers=require('./routes/productRouter')

const user_router=require('./routes/userRouter')

app.use(user_router)

app.use('api/allProducts',routers)

app.get('/',(req,res)=>{
    res.json({message:'Hello, from apii!!!!'});
})

const PORT=process.env.PORT || 3000

sequelize
.sync()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER IS RUNNING ON ${PORT}`)
    })
})

