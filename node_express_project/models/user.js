const Sequelize=require('sequelize');

const sequelize=require('../utils/database')

const User=sequelize.define('user',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  user_name:Sequelize.STRING,
  user_email:{
    type:Sequelize.STRING
  }
})

module.exports=User;