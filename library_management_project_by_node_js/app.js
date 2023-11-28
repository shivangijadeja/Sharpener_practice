const express=require('express')
const cors=require('cors')
const app=express()
const sequelize=require('./utils/database')

app.use(cors())

app.use(express.json())


app.use(express.json({extended:false}))

const book_router=require('./routes/bookRouter')

app.use(book_router)

app.get('/',(req,res)=>{
    res.json({message:'Hello, from apii!!!!'});
})

const PORT=process.env.PORT || 9999

sequelize
.sync()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER IS RUNNING ON ${PORT}`)
    })
})