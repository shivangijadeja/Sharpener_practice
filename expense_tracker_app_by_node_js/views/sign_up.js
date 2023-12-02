let my_form=document.querySelector('#sign_up_form');

my_form.addEventListener('submit',addUser);

function addUser(e){
    e.preventDefault();
    let u_name=document.querySelector('.u_name').value
    let u_email=document.querySelector('.u_email').value
    let u_pwd=document.querySelector('.u_pwd').value

    let user={
        "user_name":u_name,
        "email":u_email,
        "password":u_pwd
    }
    console.log(user)
    axios.post('http://localhost:8000/user/add-user',user)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))

}
