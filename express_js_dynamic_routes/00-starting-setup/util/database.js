const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'testing',
    password:'testing'
})

module.exports=pool.promise();