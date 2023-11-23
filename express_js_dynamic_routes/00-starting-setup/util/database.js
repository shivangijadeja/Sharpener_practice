const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node_project',
    password:'Shivangi@9909'
})

module.exports=pool.promise();