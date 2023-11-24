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
            'user_name':u_name,
            'user_email':u_email
        }
        if(document.querySelector('.btn-submit').classList.contains('update-user')){
            document.querySelector('.btn-submit').className='btn btn-success btn-submit'
            const name=document.querySelector('.btn-submit').getAttribute('selected_name')
            axios.get("http://localhost:3000/admin/get-all-user")
            .then((res)=>{
                for(var i=0;i<res.data.users.length;i++){
                    if(res.data.users[i]['user_name']===name){
                        id=res.data.users[i]['id']
                    }
                }
            }).then(()=>{
                axios.put(`http://localhost:3000/admin/update-user/${id}`,user)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }
            )
            document.querySelector('.btn-submit').removeAttribute('selected_name')
        }else{
            axios.post('http://localhost:3000/admin/add-user',
            user).then((res)=>console.log(res))
            .catch((err)=>console.log(err))
        }
        
        users.push(user)
    }
    
}

function removeitem(e){
    var li=e.target.parentElement;
    var selected_name=li.innerText.split('-')[0];
    var selected_email=(li.innerText.split('-')[1]).split('\n')[0]
    var id=0
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            item_list.removeChild(li);
            axios.get("http://localhost:3000/admin/get-all-user")
            .then((res)=>{
                for(var i=0;i<res.data.users.length;i++){
                    if(res.data.users[i]['user_name']===selected_name){
                        id=res.data.users[i]['id']
                    }
                }
            }).then(()=>{
                axios.delete(`http://localhost:3000/admin/delete-user/${id}`)
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
        document.querySelector('.btn-submit').className='btn btn-success btn-submit update-user'
        document.querySelector('.btn-submit').setAttribute('selected_name',selected_name)
        // localStorage.removeItem(selected_name);
        item_list.removeChild(li);
    }
}

window.onload = (event) => {
    axios.get("http://localhost:3000/admin/get-all-user")
    .then((res)=>{
        for(var i=0;i<res.data.users.length;i++){
            showusers(res.data.users[i])
        }
    })
    .catch((err)=>{console.log(err)})
};

function showusers(user){
    var u_name=user['user_name'];
    var u_email=user['user_email'];
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