const http=require('http')
const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const adminRoutes=require('./routes/admin.js')
const shopRoutes=require('./routes/shop.js')
const contactRoutes=require('./routes/contact_us.js')
const path=require('path')
const productController=require('./controllers/products')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRoutes)
app.use('/shop',shopRoutes)
app.use('/contact_us',contactRoutes)

app.use(productController.error_handling)


// const server=http.createServer(app)
// server.listen(4005)
app.listen(4005)