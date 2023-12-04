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

const showLeaderboard=(req,res)=>{
    db.execute('select u.user_name,sum(e.amount) as total_expense from expense_tracker_app.expense e, expense_tracker_app.user u where e.user_id=u.id group by e.user_id order by sum(e.amount) desc;')
    .then((result)=>{
        res.status(200).json({expenses:result})
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports={
    addExpense,
    getAllExpense,
    deleteExpense,
    showLeaderboard,
}