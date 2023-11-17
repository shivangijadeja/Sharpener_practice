const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
    const url=req.url
    const method=req.method
    if(url==='/')
    {
        if(fs.existsSync('./msg.txt')){
            const data = fs.readFileSync('./msg.txt', 'utf8');
            res.write('<html>')
            res.write('<head><title>Add message</title></head>')
            res.write(`<body><h5>${data}</h5><form action="/message" method="POST"><input type="text" name="message"><button>SUBMIT</button></form></body>`)
            res.write('</html>')
            return res.end()
        }
        else{
            res.write('<html>')
            res.write('<head><title>Add message</title></head>')
            res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button>SUBMIT</button></form></body>`)
            res.write('</html>')
            return res.end()
        }
        
    }
    if(url==='/message' && method==='POST'){
        const body=[]
        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const msg=parsedBody.split('=')[1]
            fs.writeFileSync('msg.txt',msg)
            res.statusCode=302
            res.setHeader('location','/')
            return res.end();
        })
    }
})
server.listen(4005)