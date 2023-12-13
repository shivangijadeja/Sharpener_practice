const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.API_KEY;
const tranEmailApi = new Sib.TransactionalEmailsApi();
const db=require('../utils/database')
const uuid = require('uuid');
const bcrypt=require('bcrypt'); 

const sendEmail = async (req, res) => {
    const id = uuid.v4();
    const user=await db.execute(`SELECT * FROM USER WHERE email='${req.body.email}'`)
    if(user){
        const password_req=await db.execute('INSERT INTO ForgotPasswordRequests (id,userid,isactive)  VALUES (?,?,?)' , [id,user[0][0].id,true])
    }
    
    const sender = {
        email: 'shivangijadeja99@gmail.com',
        name: 'shivangi'
    }
    const receivers = [
        {
            email: req.body.email
        }
    ]

    try {
        const mailresponse = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Reset Your password",
            htmlContent: `
          <!DOCTYPE html>
            <html>
            <head>
                <title>Password Reset</title>
            </head>
            <body>
                <h1>Reset Your Password</h1>
                <p>Click the button below to reset your password:</p>
                <button><a href="${process.env.IP_ADDRESS}/password/resetpassword/{{params.role}}">Reset Password</a></button>
            </body>
            </html>`, params: {
                role: id
            }
        })
      return res.status(200).json({
        message:
          "Link for reset the password is successfully send on your Mail Id!",
      });
    } catch (error) {
      console.log(error);
      return res.status(409).json({ message: "failed changing password" });
    }
};

const resetPassword=async (req,res)=>{
    const id=req.params.id
    const password_req=db.execute(`SELECT * FROM ForgotPasswordRequests where id='${id}'`)
    if(password_req){
        const update_req=db.execute(`UPDATE ForgotPasswordRequests set isactive=false where id='${id}'`)
        res.status(200).send(`
                                <html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`)
        res.end();
    }

}

const updatePassword=async(req,res)=>{
    try{
        const new_password=req.query
        const id=req.params.id
        const request_password=await db.execute(`SELECT * from ForgotPasswordRequests where id='${id}'`)
        if(request_password){
            const user=await db.execute(`SELECT * from expense_tracker_app.user where id=${request_password[0][0].userId}`)
            if(user){
                const saltrounds=5
                const pwd=new_password.newpassword 
                bcrypt.hash(pwd,saltrounds,async(err,hash)=>{
                    let password={pwd:hash}
                    await db.execute(`UPDATE USER set password='${password.pwd}' where id=${user[0][0].id}`)
                    res.status(201).json({message:"Password Updated successfully"})
                })
            }
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports={
    sendEmail,
    resetPassword,
    updatePassword
}