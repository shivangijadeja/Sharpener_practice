var my_form=document.querySelector('#addForm');

my_form.addEventListener('submit',storeuser);

function storeuser(e){
    if(document.querySelector('.user_email').value==='' || document.querySelector('.user_name').value===''){
        alert("Enter all details.....")
    }
    else{
        e.preventDefault();
        var u_name=document.querySelector('.user_name').value;
        var u_email=document.querySelector('.user_email').value;
        // localStorage.setItem('User_details',(u_name.concat(':',u_email)));
        var user={
            'User name':u_name,
            'User email':u_email
        }
        var user_serialize=JSON.stringify(user);
        localStorage.setItem('User Details',user_serialize)
        var user_deserilize=JSON.parse(localStorage.getItem('User Details'))
        console.log(user_deserilize);
        document.querySelector('.user_name').value='';
        document.querySelector('.user_email').value='';
    }
    
}