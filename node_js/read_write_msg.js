const http=require('http')
const routes=require('./routes.js')

console.log(routes.sometext)

const server=http.createServer(routes.handler)
server.listen(4005)