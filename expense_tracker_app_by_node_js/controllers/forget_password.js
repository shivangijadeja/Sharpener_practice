const Sib=require('sib-api-v3-sdk')
require('dotenv').config()

const sendEmail=(req,res)=>{

    const client=Sib.ApiClient.instance
    const apikey=client.authentications['api-key']
    apikey.apikey=process.env.API_KEY

    const transEmailApi=new Sib.TransactionalEmailsApi()
    const sender={
        email:'shivangijadeja99@gmail.com'
    }
    const receiver=[
        {
            email:req.body.email
        }
    ]
    transEmailApi.sendTransacEmail({
        sender,
        to:receiver,
        subject:"Testing email",
        textContent:" Testing this sending mail service"
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

}

module.exports={
    sendEmail,
}