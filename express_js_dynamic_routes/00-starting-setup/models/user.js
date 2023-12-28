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
    // const cartProduct=this.cart.items.findIndex(cp=>{
    //   return cp._id===product._id
    // })
    const updatedCart={items:[{productId:new mongodb.ObjectId(product._id),quantity:1 }]}
    const db=getDb()
    return db.collection('users').updateOne(
      {_id:new mongodb.ObjectId(this._id)},
      {$set:{cart:updatedCart}}
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