const express=require('express')
const cors=require('cors')
const app=express()
const sequelize=require('./utils/database')
const PORT=process.env.PORT || 8000

app.use(cors())

app.use(express.json())
app.use(express.static('views'));
app.use(express.json({extended:false}))

const userRoute=require('./routes/user_routes')

app.use(userRoute)

app.get('/',(req,res)=>{
    res.sendFile("sign_up.html",{root:'views'})
})

sequelize
.sync(
    // { force: true }
    )
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER IS RUNNING ON ${PORT}`)
    })
})