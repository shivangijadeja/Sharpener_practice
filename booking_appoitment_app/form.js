var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('items');
var users=[]

my_form.addEventListener('submit',storeuser);

item_list.addEventListener('click',removeitem);

function storeuser(e){
    if(document.querySelector('.user_email').value==='' || document.querySelector('.user_name').value===''){
        alert("Enter all details.....")
    }
    else{
        e.preventDefault();
        var u_name=document.querySelector('.user_name').value;
        var u_email=document.querySelector('.user_email').value;
        var create_item=document.createElement('li')
        create_item.className='list-group-item'
        var item_text=document.createTextNode(u_name.concat("-", u_email))
        create_item.appendChild(item_text);

        var btn_del=document.createElement('button');
        btn_del.className='btn btn-danger btn-sm float-right delete';
        var btn_text=document.createTextNode('Delete');
        btn_del.appendChild(btn_text)
        create_item.appendChild(btn_del);

        item_list.appendChild(create_item);
        
        var user={
            'User name':u_name,
            'User email':u_email
        }
        users.push(user)
        storeuser_item(users);
        // localStorage.setItem('User_details',(u_name.concat(':',u_email)));
        // var user_serialize=JSON.stringify(user);
        // localStorage.setItem('User Details',user_serialize)
        // var user_deserilize=JSON.parse(localStorage.getItem('User Details'))
        // console.log(user_deserilize);
        document.querySelector('.user_name').value='';
        document.querySelector('.user_email').value='';
    }
    
}
function storeuser_item(users) {
    for(var i=0;i<users.length;i++){
        console.log(users[i])
        serialize_data=JSON.stringify(users[i])
        deserialize_data=JSON.parse(serialize_data)
        localStorage.setItem(deserialize_data['User name'], serialize_data )
        
    }
}
function removeitem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            item_list.removeChild(li);
            var selected_name=li.innerText.split('-')[0];
            localStorage.removeItem(selected_name);
        }
    }
}