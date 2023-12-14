const express=require('express')
const cors=require('cors')
const app=express()
const sequelize=require('./utils/database')
const PORT=process.env.PORT || 8000

app.use(cors({
    origin:"*",
    methods:["GET","POST"]
}))

app.use(express.json())
app.use(express.static('views'));
app.use(express.json({extended:false}))

const userRoute=require('./routes/user_routes')
const User=require('./models/user')
const ChatHistory=require('./models/chatHistory')

app.use(userRoute)

app.get('/',(req,res)=>{
    res.sendFile("sign_up.html",{root:'views'})
})

app.get('/chat',(req,res)=>{
    res.sendFile("chat.html",{root:'views'})
})

User.hasMany(ChatHistory)
ChatHistory.belongsTo(User)

sequelize
.sync(
    // { force: true }
    )
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER IS RUNNING ON ${PORT}`)
    })
})