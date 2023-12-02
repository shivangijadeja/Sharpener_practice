let my_form=document.querySelector('.login_form');

my_form.addEventListener('submit',loginUser);

function loginUser(e){
    e.preventDefault();
    let u_email=document.querySelector('.u_email').value
    let u_pwd=document.querySelector('.u_pwd').value
    let user_exist;

    let user={
        "email":u_email,
        "password":u_pwd
    }
    axios.get('http://localhost:8000/user/all-users').then((res)=>{
        if(res.data.users[0].length>0){
            for(let i=0;i<res.data.users.length;i++){
                if(res.data.users[0][i].email===u_email){
                    user_exist=true
                }
            }
        }
    }).then(()=>{
        if(user_exist){

            axios.get('http://localhost:8000/user/all-users').then((res)=>{
            if(res.data.users[0].length>0){
                for(let i=0;i<res.data.users.length;i++){
                    if(res.data.users[0][i].email===u_email && res.data.users[0][i].password!=u_pwd){
                        document.querySelector('#error_msg').classList=""
                        document.querySelector('#error_msg').value="Password is incorrect"
                        user_exist=false
                    }
                }
            }
        }).then(()=>{
            if(user_exist){
                axios.post('http://localhost:8000/user/login',user)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
                alert("user logged in successfully")
            }
        })    
        }
        else{
            console.error("User doesn't exits")
        }
    })
    .catch((err)=>console.log(err))
    
    

}
