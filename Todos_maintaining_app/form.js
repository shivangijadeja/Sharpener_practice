var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('todos_remaining');
var done_item_list=document.getElementById('todos_done');
const url="https://crudcrud.com/api/36ea235b7afd435791e575fa0ce7fd4c/todos/"

my_form.addEventListener('submit',addTodo);

item_list.addEventListener('click',changeTodo);

function addTodo(e){
    e.preventDefault();
    var name=document.querySelector('.name').value;
    var description=document.querySelector('.description').value;
    var is_done='No'
    if(name==='' || description===''){
        alert("Add Proper details")
    }
    else{
        var create_item=document.createElement('li')
        create_item.className='list-group-item'
        var item_text=document.createTextNode(name.concat("-", description))
        create_item.appendChild(item_text);

        var btn_edit=document.createElement('button');
        var add_text=document.createTextNode('DONE')
        btn_edit.appendChild(add_text)
        btn_edit.className='btn btn-info btn-sm mr-2 float-right icon-check-sign done'
        create_item.appendChild(btn_edit)

        var btn_del=document.createElement('button');
        var del_text=document.createTextNode('X')
        btn_del.appendChild(del_text)
        btn_del.className='btn btn-danger btn-sm mr-2 float-right delete btn-close';
        create_item.appendChild(btn_del);

        item_list.appendChild(create_item);
        var todo={
            'name':name,
            'description':description,
            'is_done':is_done
        }

        axios.post(url,todo)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }
}

function changeTodo(e){
    var li=e.target.parentElement;
    var selected_name=li.innerText.split('-')[0];
    var description=(li.innerText.split('-')[1]).split('\n')[0]
    var id=0
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            item_list.removeChild(li);
            axios.get(url)
            .then((res)=>{
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i]['name']===selected_name){
                        id=res.data[i]['_id']
                    }
                }
            }).then(()=>{
                axios.delete(`${url}${id}`)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }
            )
        }
    }
    if(e.target.classList.contains('done')){

        axios.get(url)
        .then((res)=>{
            for(var i=0;i<res.data.length;i++){
                if(res.data[i]['name']===selected_name){
                    id=res.data[i]['_id']
                    console.log(id)
                }
            }
        })
        .then(()=>{
            axios.put(`${url}${id}`,{
                "name":selected_name,
                "description":description,
                "is_done":"Yes"
            })
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
        }
        )
        item_list.removeChild(li);
        var btn_add=li.querySelector('.done')
        var btn_del=li.querySelector('.delete')
        li.removeChild(btn_add)
        li.removeChild(btn_del)
        done_item_list.appendChild(li);
    }
}

window.onload = (event) => {
    // axios.get(url)
    // .then((res)=>{
    //     for(var i=0;i<res.data.length;i++){
    //         show_remaining_todo(res.data[i])
    //     }
    // })
    // .catch((err)=>{console.log(err)})

    const loadData=async()=>{
        try{
            let data=axios.get(url)
            let final_data=await data
            for(var i=0;i<final_data.data.length;i++){
                show_remaining_todo(final_data.data[i])
            }
        }
        catch(err){
            console.error(err)
        }
    }
    loadData();
    
};

function show_remaining_todo(todo){
    var name=todo['name'];
    var description=todo['description'];
    var is_todo_done=todo['is_done'];
    var create_item=document.createElement('li')
    create_item.className='list-group-item'
    var item_text=document.createTextNode(name.concat("-", description))
    create_item.appendChild(item_text);

    
        
    if(is_todo_done==='No'){
        var btn_edit=document.createElement('button');
        var add_text=document.createTextNode('DONE')
        btn_edit.appendChild(add_text)
        btn_edit.className='btn btn-info btn-sm mr-2 float-right icon-check-sign done'
        create_item.appendChild(btn_edit)

        var btn_del=document.createElement('button');
        var del_text=document.createTextNode('X')
        btn_del.appendChild(del_text)
        btn_del.className='btn btn-danger btn-sm mr-2 float-right delete btn-close';
        create_item.appendChild(btn_del);

        item_list.appendChild(create_item);
    }
    else{
        done_item_list.appendChild(create_item);
    }
       
}