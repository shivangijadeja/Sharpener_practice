const Sequelize=require('sequelize');

const sequelize=new Sequelize('library_management','root','Shivangi@9909',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;