const mongodb=require('mongodb')
const getDb=require('../util/database').getDb

class User{
  constructor(name,email,cart,id){
    this.name=name
    this.email=email
    this.cart=cart  //{items:[]}
    this._id=id
  }

  save(){
    const db=getDb()
    return db.collection('users').insertOne(this)
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  addToCart(product){
    const cartProductIndex=this.cart.items.findIndex(cp=>{
      return cp.productId.toString()===product._id.toString()
    })
    let newQuantity=1
    const updatedCartitems=[...this.cart.items];
    if(cartProductIndex>=0){
      newQuantity=this.cart.items[cartProductIndex].quantity+1
      updatedCartitems[cartProductIndex].quantity=newQuantity
    }
    else{
      updatedCartitems.push({productId:new mongodb.ObjectId(product._id),quantity:newQuantity })
    }
    const updatedCart={
      items:updatedCartitems
    }
    const db=getDb()
    return db.collection('users').updateOne(
      {_id:new mongodb.ObjectId(this._id)},
      {$set:{cart:updatedCart}}
      )
  }

  getCart(){
    const db=getDb()
    const productIds=this.cart.items.map(i=>{
      return i.productId
    })
    return db.collection("products").find({_id:{$in:productIds}})
    .toArray()
    .then(products=>{
      return products.map(p=>{
        return {...p,quantity:this.cart.items.find(i=>{
          return i.productId.toString()===p._id.toString()
        }).quantity
      }
      })
    })
  }

  deleteProductFromCart(productid){
    const updatedCartitems=this.cart.items.filter(item=>{
      return item.productId.toString() !== productid.toString()
    })
    const db=getDb()
    return db.collection('users').updateOne(
      {_id:new mongodb.ObjectId(this._id)},
      {$set:{cart:{items:updatedCartitems}}}
      )
  }

  static findUserById(u_id){
    const db=getDb()
    return db.collection('users').findOne({_id:new mongodb.ObjectId(u_id)})
    .then((user)=>{
      console.log(user)
      return user
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}

// const Sequelize=require('sequelize');

// const sequelize=require('../util/database')

// const User=sequelize.define('user',{
//   id:{
//     type:Sequelize.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true
//   },
//   user_name:Sequelize.STRING,
//   user_email:{
//     type:Sequelize.STRING
//   }
// })

module.exports=User;