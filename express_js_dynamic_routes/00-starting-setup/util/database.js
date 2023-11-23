const Sequelize=require('sequelize');

const sequelize=new Sequelize('node_project','root','Shivangi@9909',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;