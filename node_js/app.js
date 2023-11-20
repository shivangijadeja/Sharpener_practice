const http=require('http')
const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const adminRoutes=require('./routes/admin.js')
const shopRoutes=require('./routes/shop.js')

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoutes)
app.use('/shop',shopRoutes)

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found!!!</h1>')
})


// const server=http.createServer(app)
// server.listen(4005)
app.listen(4005)