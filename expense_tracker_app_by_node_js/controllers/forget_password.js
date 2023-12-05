const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.API_KEY;
const tranEmailApi = new Sib.TransactionalEmailsApi();

const sendEmail = async (req, res) => {
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
                <button><a href="/password/reset/{{params.role}}">Reset Password</a></button>
            </body>
            </html>`, params: {
                role: 5
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

module.exports={
    sendEmail,
}