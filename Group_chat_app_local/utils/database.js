const Sequelize=require('sequelize');

const sequelize=new Sequelize('group_chat_app','root','Shivangi@9909',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;