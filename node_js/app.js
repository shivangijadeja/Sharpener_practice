const http=require('http')
const express=require('express')
const app=express()
app.use((req,res,next)=>{
    console.log('in the middleware')
    next(); //it allows the request to continue to the next middleware in line
})
app.use((req,res,next)=>{
    console.log('in the another middleware')
    res.send("<h1>HELLO FROM EXPRESS JS</h1>")
})
const server=http.createServer(app)
server.listen(4005)