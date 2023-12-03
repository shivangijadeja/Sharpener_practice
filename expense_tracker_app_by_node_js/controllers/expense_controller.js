const db=require('../utils/database')

const addExpense=(req,res)=>{

    const amount = req.body.amount;
    const description = req.body.description;
    const category=req.body.category;
    const user_id=req.user
    db.execute('INSERT INTO EXPENSE (amount,description,category,user_id)  VALUES (?,?,?,?)' , [amount,description,category,user_id])
    res.status(201).json({message:"Successfully expense created"})
}

const getAllExpense=(req,res)=>{
    db.execute(`SELECT * FROM EXPENSE where user_id=${req.user}`).then((result)=>{
        res.status(200).json({expenses:result})
    })
}

const deleteExpense=(req,res)=>{
    db.execute(`Delete FROM EXPENSE where id=${req.params.id}`).then((result)=>{
        res.status(200).json({expenses:result})
    })
}

module.exports={
    addExpense,
    getAllExpense,
    deleteExpense,
}