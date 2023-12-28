// const Sequelize=require('sequelize');

// const sequelize=new Sequelize('node_project','root','Shivangi@9909',{
//     dialect:'mysql',
//     host:'localhost'
// });

// module.exports=sequelize;

const mongodb=require('mongodb')
const mongoCLient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback)=>{
    mongoCLient.connect('mongodb+srv://shivangi:shivangi@cluster0.zjwh2kd.mongodb.net/shop?retryWrites=true&w=majority')
    .then((client)=>{
        console.log("Connected");
        _db=client.db()
        callback(client)
    })
    .catch((err)=>{
        console.log(err);
        throw err
    })
}

const getDb=()=>{
    if(_db){
        return _db;
    }
    else{
        throw "No database found"
    }
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;