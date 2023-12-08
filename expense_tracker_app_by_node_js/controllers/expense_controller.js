const db=require('../utils/database')
const dotenv = require('dotenv');
dotenv.config();
const AWS = require('aws-sdk');

const addExpense=(req,res)=>{

    const amount = req.body.amount;
    const description = req.body.description;
    const category=req.body.category;
    const user_id=req.user
    db.execute('INSERT INTO EXPENSE (amount,description,category,user_id)  VALUES (?,?,?,?)' , [amount,description,category,user_id])
    db.execute(`select total_expense from user where id=${user_id}`).then((total_expense)=>{
        const previous_expense=total_expense[0][0].total_expense
        db.execute(`update user set total_expense=${previous_expense}+${amount} where id=${user_id}`)
    }).then(()=>{
        res.status(201).json({message:"Successfully expense created"})
    })
}

const getAllExpense=(req,res)=>{
    const page = +req.query.page || 1;
    const EXPANSE_PER_PAGE = +req.query.entries;
    let totalItems;
    const result=db.execute(`SELECT COUNT(*) as count FROM expense_tracker_app.expense where user_id=${req.user}`)
    .then((res)=>{
        totalItems=res[0][0].count
    })
    db.execute(`SELECT * FROM EXPENSE where user_id=${req.user} LIMIT ${EXPANSE_PER_PAGE} Offset ${(page-1) * EXPANSE_PER_PAGE}`).then((result)=>{
        res.status(200).json({
            expenses:result,
            currentPage : page,
            hasNextPage : EXPANSE_PER_PAGE * page < totalItems,
            nextPage : page + 1,
            hasPreviousPage : page > 1,
            previousPage : page - 1,
            lastPage : Math.ceil(totalItems/EXPANSE_PER_PAGE)
        })
    })
}

const deleteExpense=(req,res)=>{
    const user_id=req.user
    const amount=req.header('amount')
    db.execute(`select total_expense from user where id=${user_id}`).then((total_expense)=>{
        const previous_expense=total_expense[0][0].total_expense
        db.execute(`update user set total_expense=${previous_expense}-${amount} where id=${user_id}`)
    })
    db.execute(`Delete FROM EXPENSE where id=${req.params.id}`)
    
    .then((result)=>{
        res.status(200).json({expenses:result})
    })
}

const showLeaderboard=(req,res)=>{
    // db.execute('select u.user_name,sum(e.amount) as total_expense from expense_tracker_app.expense e, expense_tracker_app.user u where e.user_id=u.id group by e.user_id order by sum(e.amount) desc;')
    db.execute('select user_name,total_expense from expense_tracker_app.user order by total_expense desc')
    .then((result)=>{
        res.status(200).json({expenses:result})
    }).catch((err)=>{
        console.log(err)
    })
}

const getHistoryData=async (req,res)=>{
    const user_id=req.user
    try{
        const data=await db.execute(`SELECT * FROM expense_tracker_app.expense where user_id=${user_id}`)
        if(data){
            res.status(200).json({expenses:data})
        }
    }
    catch{
        res.status(401).json({message:'Unable to fetch history'})
    }
    

}

const uploadToS3 = async (data, filename) => {
    try {
        const bucketName = process.env.BUCKET_NAME;
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const s3 = new AWS.S3({
            accessKeyId,
            secretAccessKey,
        });
        const uploadParams = {
            Bucket: bucketName,
            Key: filename,
            Body: data,
            ACL: 'public-read',
        };
        const uploadResponse = await s3.upload(uploadParams).promise();
        return uploadResponse.Location;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
}

const getDownloadURL = async (request, response, next) => {
    try {
      const user = request.user;
      const expenses=await db.execute(`select * from expense where user_id=${user}`)
      const formattedExpenses = expenses[0].map(expense => {
        return `Category: ${expense.category}
                Amount: ${expense.amount}
                Date: ${expense.created_at}
                `;
      });
      const textData = formattedExpenses.join("\n");
      const filename = `expense-data/user${user}/${new Date()}.txt`;
      const URL = await uploadToS3(textData, filename);
      const createDl=await db.execute('INSERT INTO DOWNLOAD (downloadUrl,user_id) VALUES (?,?)' , [URL,user])

      response.status(200).json({URL,success:true});
    } catch (error) {
      console.log("Error while creating download link: " + error);
      response.status(500).json({ message: "Unable to generate URL" });
    }
};

module.exports={
    addExpense,
    getAllExpense,
    deleteExpense,
    showLeaderboard,
    getDownloadURL,
    getHistoryData,
}