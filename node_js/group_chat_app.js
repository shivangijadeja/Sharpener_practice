const http=require('http')
const routes=require('./group_chat_routes.js')


const server=http.createServer(routes.handler)
server.listen(4050)