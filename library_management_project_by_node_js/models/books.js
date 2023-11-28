const Sequelize=require('sequelize');

const sequelize=require('../utils/database')

const Book=sequelize.define('book',{
    name:{
        type:Sequelize.STRING
    },
    taken_on:{
        type:Sequelize.DATE
    },
    return_on:{
        type:Sequelize.DATE
    },
    book_fine:{
        type:Sequelize.INTEGER
    },
    is_return:{
        type:Sequelize.BOOLEAN
    }
})

module.exports=Book; 