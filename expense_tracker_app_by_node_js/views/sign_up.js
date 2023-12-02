let my_form=document.querySelector('#sign_up_form');

my_form.addEventListener('submit',addUser);

function addUser(e){
    e.preventDefault();
    let u_name=document.querySelector('.u_name').value
    let u_email=document.querySelector('.u_email').value
    let u_pwd=document.querySelector('.u_pwd').value
    let user_exist;

    let user={
        "user_name":u_name,
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
        if(!user_exist){
            axios.post('http://localhost:8000/user/add-user',user)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
        }
        else{
            console.error("User already exits")
        }
    })
    .catch((err)=>console.log(err))
    
    

}
