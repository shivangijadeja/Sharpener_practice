const fs=require('fs')

const requestHandler=((req,res)=>{
    const url=req.url
    const method=req.method
    if(url==='/' && method==='POST'){
        const body=[]
        req.on('data',(chunk)=>{
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const msg=parsedBody.split('&')[0].split('=')[1]
            const usr=parsedBody.split('&')[1].split('=')[1]
            fs.appendFileSync('group_chat.txt',usr.concat(':',msg,' '))
            return res.end();
        })
    }
    if(url==='/')
    {
        if(fs.existsSync('./group_chat.txt')){
            const data = fs.readFileSync('./group_chat.txt', 'utf8');
            res.write('<html>')
            res.write('<head><title>Add message</title></head>')
            res.write(`<body><h5>${data}</h5>
            <form action="/" 
            onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST"> 
            <input type="text" name="message">
            <input type="hidden" name="username" id="username">
            <button>SUBMIT</button></form></body>`)
            res.write('</html>')
            return res.end()
        }
        else{
            res.write('<html>')
            res.write('<head><title>Add message</title></head>')
            res.write(`<body><form action="/" 
            onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST"> 
            <input type="text" name="message">
            <input type="hidden" name="username" id="username">
            <button>SUBMIT</button></form></body>`)
            res.write('</html>')
            return res.end()
        }
        
    }
    if(url==='/login'){
        res.write('<html>')
        res.write('<head><title>Add user</title></head>')
        res.write(`<body><form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" action='/'><input type="text" id='username' name="message"><button>ADD USER</button></form></body>`)
        res.write('</html>')
        return res.end();
    }
})
// module.exports=requestHandler

module.exports={
    handler:requestHandler,
}