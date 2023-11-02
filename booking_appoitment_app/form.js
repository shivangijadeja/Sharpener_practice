var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('items');
var body=document.querySelector('body')

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

        var btn_edit=document.createElement('button');
        btn_edit.className='btn btn-info btn-sm mr-2 float-right edit_button'
        var btn_edit_text=document.createTextNode('Edit');
        btn_edit.appendChild(btn_edit_text);
        create_item.appendChild(btn_edit)

        var btn_del=document.createElement('button');
        btn_del.className='btn btn-danger btn-sm mr-2 float-right delete';
        var btn_text=document.createTextNode('Delete');
        btn_del.appendChild(btn_text)
        create_item.appendChild(btn_del);

        item_list.appendChild(create_item);
        
        var user={
            'User name':u_name,
            'User email':u_email
        }
        axios.post('https://crudcrud.com/api/37670e6543cb4ce5bcd6a954d07dd3d8/studentdata/',
        {u_name,u_email}).then((res)=>console.log(res))
          .catch((err)=>console.log(err))
        users.push(user)
        // storeuser_item(users);
        // localStorage.setItem('User_details',(u_name.concat(':',u_email)));
        // var user_serialize=JSON.stringify(user);
        // localStorage.setItem('User Details',user_serialize)
        // var user_deserilize=JSON.parse(localStorage.getItem('User Details'))
        // console.log(user_deserilize);

        // document.querySelector('.user_name').value='';
        // document.querySelector('.user_email').value='';
    }
    
}
// function storeuser_item(users) {
//     for(var i=0;i<users.length;i++){
//         console.log(users[i])
//         serialize_data=JSON.stringify(users[i])
//         deserialize_data=JSON.parse(serialize_data)
//         localStorage.setItem(deserialize_data['User name'], serialize_data )
        
//     }
// }
function removeitem(e){
    var li=e.target.parentElement;
    var selected_name=li.innerText.split('-')[0];
    var selected_email=(li.innerText.split('-')[1]).split('\n')[0]
    var id=0
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            item_list.removeChild(li);
            axios.get("https://crudcrud.com/api/37670e6543cb4ce5bcd6a954d07dd3d8/studentdata")
            .then((res)=>{
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i]['u_name']===selected_name){
                        id=res.data[i]['_id']
                    }
                }
            }).then(()=>{
                axios.delete(`https://crudcrud.com/api/37670e6543cb4ce5bcd6a954d07dd3d8/studentdata/${id}`)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }
            )
            
            // localStorage.removeItem(selected_name);
        }
    }
    if(e.target.classList.contains('edit_button')){
        document.querySelector('.user_name').value=selected_name;
        document.querySelector('.user_email').value=selected_email;
        localStorage.removeItem(selected_name);
        item_list.removeChild(li);
    }
}

window.onload = (event) => {
    axios.get("https://crudcrud.com/api/37670e6543cb4ce5bcd6a954d07dd3d8/studentdata")
    .then((res)=>{
        for(var i=0;i<res.data.length;i++){
            showusers(res.data[i])
        }
        console.log(res.data)
    })
    .catch((err)=>{console.log(err)})
};

function showusers(user){
    var u_name=user['u_name'];
    var u_email=user['u_email'];
    var create_item=document.createElement('li')
    create_item.className='list-group-item'
    var item_text=document.createTextNode(u_name.concat("-", u_email))
    create_item.appendChild(item_text);

    var btn_edit=document.createElement('button');
    btn_edit.className='btn btn-info btn-sm mr-2 float-right edit_button'
    var btn_edit_text=document.createTextNode('Edit');
    btn_edit.appendChild(btn_edit_text);
    create_item.appendChild(btn_edit)

    var btn_del=document.createElement('button');
    btn_del.className='btn btn-danger btn-sm mr-2 float-right delete';
    var btn_text=document.createTextNode('Delete');
    btn_del.appendChild(btn_text)
    create_item.appendChild(btn_del);

    item_list.appendChild(create_item);
}