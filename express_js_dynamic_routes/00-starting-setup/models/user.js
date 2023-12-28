const mongodb=require('mongodb')
const getDb=require('../util/database').getDb

class User{
  constructor(name,email){
    this.name=name
    this.email=email
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

  static findUserById(u_id){
    const db=getDb()
    return db.collection('users').findOne({_id:new mongodb.ObjectId(u_id)})
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