const Sequelize=require('sequelize');

const sequelize=require('../utils/database')

const Product=sequelize.define('product',{
    // id:{
    //     type:Sequelize.INTEGER,
    //     autoIncrement:true
    // },
    title:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.INTEGER
    },
    description:{
        type:Sequelize.TEXT
    },
    published:{
        type:Sequelize.BOOLEAN
    }
})

module.exports=Product; 