let my_form=document.querySelector('.forget_password_form');

my_form.addEventListener('submit',forgetPassword);

function forgetPassword(e){
    e.preventDefault();
    let user={
        "email": document.querySelector('.u_email').value
    }
    axios.post('/password/forgotpassword',user)
}