// console.log("Hello World");

const http=require('http')
const server=http.createServer((req,res)=>{
    // console.log("Shivangi")
    const url=req.url
    if(url==='/home'){
        res.write('<html>')
        res.write('<head><title>My home page</title></head>')
        res.write('<body><h1>Welcome home</h1></body>')
        res.write('</html>')
        res.end()
    }
    else if(url==='/about'){
        res.write('<html>')
        res.write('<head><title>My about us page</title></head>')
        res.write('<body><h1>Welcome to about us page</h1></body>')
        res.write('</html>')
        res.end()
    }
    else if(url==='/node' || url==='/'){
        res.write('<html>')
        res.write('<head><title>My node page</title></head>')
        res.write('<body><h1>Welcome to my Node Js project</h1></body>')
        res.write('</html>')
        res.end()
    }
})
server.listen(4000)