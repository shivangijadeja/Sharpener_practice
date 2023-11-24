const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Code start for Booking appoitment app backend

const cors=require('cors')

app.use(cors())

const User=require('./models/user');

const addUser= async (req, res, next)=>{
    console.log(req.body)
    const u_name = req.body.user_name;
    const email = req.body.user_email;
    const data=await User.create({
        user_name:u_name,
        user_email:email
    }).then(result=>{
    console.log(result)
    }).catch(err=>console.log(err))
}

const displayAllUser=(req, res, next)=>{
    User.findAll().then((rows)=>{
        res.status(200).json({users:rows})
    }).catch((err)=>{
        console.log(err)
    })
}

const deleteUser=(req,res,next)=>{
    const id=req.params.id
    User.destroy({where:{id:id}})
    .then(()=>{
    res.redirect('/')
  }).catch((err)=>console.log(err))
}

const updateUser=(req,res,next)=>{
    const id=req.params.id
    const u_name = req.body.user_name;
    const email = req.body.user_email;
    User.update({
        user_name:u_name,
        user_email:email
    },{
        where:{id:id}
    })
}

app.post('/admin/add-user',addUser)

app.get('/admin/get-all-user',displayAllUser)

app.delete('/admin/delete-user/:id',deleteUser)

app.put('/admin/update-user/:id',updateUser)

// Code end for Booking appoitment app backend

// Code start for Expense app backend

const Expense=require('./models/expense');

const addExpense=(req,res,next)=>{
    const amount=req.body.expense_amount
    const des=req.body.expense_description
    const category=req.body.expense_category
    Expense.create({
        amount:amount,
        description:des,
        expense_category:category
    }).then((res)=>console.log(res))
    .catch((err)=>console.log(err))
}

const displayExpenses=(req, res, next)=>{
    Expense.findAll().then((rows)=>{
        res.status(200).json({expenses:rows})
    }).catch((err)=>{
        console.log(err)
    })
}

const deleteExpense=(req,res,next)=>{
    const id=req.params.id
    Expense.destroy({where:{id:id}})
    .then(()=>{
    res.redirect('/')
  }).catch((err)=>console.log(err))
}

const updateExpense=(req,res,next)=>{
    const id=req.params.id
    const amount=req.body.expense_amount
    const des=req.body.expense_description
    const category=req.body.expense_category
    Expense.update({
        amount:amount,
        description:des,
        expense_category:category
    },{
        where:{id:id}
    })

}

app.post('/add-expense',addExpense)

app.get('/display-expense',displayExpenses)

app.delete('/delete-expense/:id',deleteExpense)

app.put('/update-expense/:id',updateExpense)

// Code end for Expense app backend

app.use(errorController.get404);

sequelize.sync().then(res=>{
    app.listen(3000);
}).catch(err=>console.log(err))

