const razorpay=require('razorpay')
const db=require('../utils/database')

const purchasePremium=async(req,res)=>{
    try{
        var rzp=new razorpay({
            key_id:"rzp_test_Xq1Zj5MQQAZGdr",
            key_secret:"YlbPDRZYerisNnGqcCOv6Wi5"
        })
        const amount=2500
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                console.log(err)
            }
        db.execute('INSERT INTO expense_tracker_app.ORDER (paymentid,orderid,status,user_id)  VALUES (?,?,?,?)' , ['',order.id,'PENDING',req.user])
        .then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id})
        }).catch((err)=>{
            console.log(err)
        })
        })
    }
    catch(err){
        res.status(403).json({message:'Something went wrong!!',error:err})
    }
}

const updateTransactionStatus=async (req,res)=>{
    try{
        const {payment_id,order_id}=req.body
        db.execute(`select * from expense_tracker_app.order where orderid='${order_id}'`).then(
            res_order=>{
                db.execute(`update expense_tracker_app.order set paymentid='${payment_id}', status='SUCCESSFULL' where id=${res_order[0][0].id}`)
                .then(()=>{
                    db.execute(`update expense_tracker_app.user set is_preminum_user=true where id=${req.user}`).then(()=>{
                        return res.status(202).json({succes:true,message:"transaction successfully done"})
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }
        )
    }
    catch(err){
        console.log(err)
    }
}



module.exports={
    purchasePremium,
    updateTransactionStatus
}