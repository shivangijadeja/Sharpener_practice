const db=require('../utils/database')

const addExpense=(req,res)=>{

    const amount = req.body.amount;
    const description = req.body.description;
    const category=req.body.category;

    db.execute('INSERT INTO EXPENSE (amount,description,category)  VALUES (?,?,?)' , [amount,description,category])
    res.status(201).json({message:"Successfully expense created"})
}

const getAllExpense=(req,res)=>{
    db.execute('SELECT * FROM EXPENSE').then((result)=>{
        res.status(200).json({expenses:result})
    })
}

module.exports={
    addExpense,
    getAllExpense,
}