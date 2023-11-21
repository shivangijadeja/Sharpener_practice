const path=require('path')
const fs=require('fs')
const rootDir=require('../util/path')

module.exports=class Product{
    constructor(t){
        this.title=t;
    }
    save(){
        console.log("add data")
        const p=path.join(rootDir,'data','product.json')
        fs.readFile(p,(err,fileContent)=>{
            let products=[]
            if(!err){
                products=JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p,JSON.stringify(products))
        });
    }
    static fetchAll(){
        return "products"
    }
}