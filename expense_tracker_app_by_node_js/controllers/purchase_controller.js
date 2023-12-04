const razorpay=require('razorpay')
const db=require('../utils/database')

const purchasePremium=async(req,res)=>{
    try{
        var rzp=new razorpay({
            key_id:"rzp_test_8gsqGSWEO0Wie8",
            key_secret:"Vv6UnAbBlKfWFbJwYNL3JH92"
        })
        const amount=2500
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
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



module.exports={
    purchasePremium   
}