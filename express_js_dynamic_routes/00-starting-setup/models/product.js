const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const ProductSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});

module.exports=mongoose.model('Product',ProductSchema)

// // const Sequelize=require('sequelize');

// // const sequelize=require('../util/database')
// const mongodb=require('mongodb')
// const getDb=require('../util/database').getDb

// class Product{
//   constructor(title,imageUrl,price,description,id,userId){
//     this.title=title
//     this.price=price
//     this.imageUrl=imageUrl
//     this.description=description
//     this._id=id?new mongodb.ObjectId(id):null
//     this.userId=userId
//   }
//   save(){
//     const db=getDb()
//     let dbOp;
//     if(this._id){
//       // Update Product
//       dbOp=db.collection('products').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:this})
//     }
//     else{
//       dbOp=db.collection('products').insertOne(this)
//     }
//     return dbOp
//     .then((result)=>{
//       console.log(result)
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   static fetchAll(){
//     const db=getDb()
//     return db.collection('products').find().toArray()
//     .then((products)=>{
//       console.log(products)
//       return products
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   static findOne(prod_id){
//     const db=getDb()
//     return db.collection('products').find({_id:new mongodb.ObjectId(prod_id)})
//     .next()
//     .then((product)=>{
//       console.log(product)
//       return product
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   static deleteById(prod_id){
//     const db=getDb()
//     return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prod_id)})
//     .then(()=>{
//       console.log("product deleted")
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }
// }

// // const Product=sequelize.define('product',{
// //   id:{
// //     type:Sequelize.INTEGER,
// //     autoIncrement:true,
// //     allowNull:false,
// //     primaryKey:true
// //   },
// //   title:Sequelize.STRING,
// //   price:{
// //     type:Sequelize.DOUBLE,
// //     allowNull:false
// //   },
// //   imageUrl:{
// //     type:Sequelize.STRING,
// //     allowNull:false
// //   },
// //   description:{
// //     type:Sequelize.STRING,
// //     allowNull:false
// //   }
// // })

// module.exports=Product;