const Sequelize=require('sequelize');

const sequelize=require('../utils/database')

const Review=sequelize.define('review',{
    // id:{
    //     type:Sequelize.INTEGER,
    //     autoIncrement:true
    // },
    rating:{
        type:Sequelize.INTEGER
    },
    description:{
        type:Sequelize.TEXT
    }
})

module.exports=Review 