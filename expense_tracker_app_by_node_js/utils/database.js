const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'expense_tracker_app',
    password:'Shivangi@9909'
})

module.exports=pool.promise();