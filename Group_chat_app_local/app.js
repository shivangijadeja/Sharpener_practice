const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require('@socket.io/admin-ui');
const express=require('express')
const cors=require('cors')
const app=express()
const sequelize=require('./utils/database')
const PORT=process.env.PORT || 8000

app.use(cors({
    origin:"*",
    methods:["GET","POST"]
}))

app.use(express.json())
app.use(express.static('views'));
app.use(express.json({extended:false}))

const userRoute=require('./routes/user_routes')
const User=require('./models/user')
const Groups=require('./models/group')
const GroupMember=require('./models/group_members')
const ChatHistory=require('./models/chatHistory')
const CommonChats=require('./models/common_chats')
const websocketService = require('./services/webSocket');
const cronService = require('./services/cronService');
cronService.job.start();

app.use(userRoute)

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io",],
    credentials: true
  }
});
io.on('connection', websocketService )

instrument(io, { auth: false })

app.get('/',(req,res)=>{
    res.sendFile("sign_up.html",{root:'views'})
})

app.get('/chat',(req,res)=>{
    res.sendFile("chat.html",{root:'views'})
})

User.hasMany(ChatHistory)
ChatHistory.belongsTo(User)
User.hasMany(CommonChats)
CommonChats.belongsTo(User)
User.belongsToMany(Groups, { through: GroupMember });
Groups.belongsToMany(User, { through: GroupMember });
Groups.belongsTo(User,{foreignKey: 'AdminId',constraints:true,onDelete:'CASCADE'})
Groups.hasMany(ChatHistory);
ChatHistory.belongsTo(Groups);

async function initiate() {
    try {
        const result = await sequelize.sync();
        httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} `);
      })
    } catch (err) {
      console.error('Error during server initialization:', err);
      process.exit(1); 
    }
  }
initiate();