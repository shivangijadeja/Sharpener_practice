const db=require('../util/database')

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
      return db.execute('INSERT INTO PRODUCTS (title,price,imageUrl,description) VALUES (?,?,?,?)',
      [this.title,this.price,this.imageUrl,this.description])
  }

  static deleteById(id){
    return db.execute("DELETE FROM PRODUCTS WHERE ID=?",[id])
  }

  static fetchAll() {
    return db.execute("SELECT * FROM PRODUCTS")
  }

  static findById(id){
    return db.execute('SELECT * FROM PRODUCTS WHERE ID=?',[id])
  }
};
