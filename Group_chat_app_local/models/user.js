const Sequelize=require('sequelize');

const sequelize=require('../utils/database')

const User=sequelize.define('user',{
    user_name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    phone_number:{
        type:Sequelize.NUMBER
    },
    password:{
        type:Sequelize.STRING
    },
    is_return:{
        type:Sequelize.BOOLEAN
    }
})

module.exports=User; 