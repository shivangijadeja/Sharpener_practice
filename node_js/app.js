const http=require('http')
const express=require('express')
const app=express()
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded());

app.use('/',(req,res,next)=>{
    console.log('This middleware calls always')
    next(); //it allows the request to continue to the next middleware in line
})
app.use('/add_product',(req,res,next)=>{
    res.send("<form action='/product' method='POST'><input type='text' name='title'><br/><input type='number' name='size'> <br/> <button type='submit'>Add product</button></form>")
})

app.use('/product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})

app.use('/',(req,res,next)=>{
    res.send('<h1>HELLO</h1>')
})
// const server=http.createServer(app)
// server.listen(4005)
app.listen(4005)