var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('items');

my_form.addEventListener('submit',additem);

item_list.addEventListener('click',removeitem);

function additem(e){
    e.preventDefault();

    var input_value=document.querySelector('#item').value;
    // console.log(input_value);
    var create_item=document.createElement('li')
    create_item.className='list-group-item'
    var item_text=document.createTextNode(input_value)
    create_item.appendChild(item_text);
    
    var btn_del=document.createElement('button');
    btn_del.className='btn btn-danger btn-sm float-right delete';
    var btn_text=document.createTextNode('X');
    btn_del.appendChild(btn_text)
    create_item.appendChild(btn_del)

    var btn_edit=document.createElement('button');
    btn_edit.className='btn btn-info align-center'
    var btn_edit_text=document.createTextNode('EDIT');
    btn_edit.appendChild(btn_edit_text);
    create_item.appendChild(btn_edit)

    item_list.appendChild(create_item);

    document.querySelector('#item').value=''
}

function removeitem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            item_list.removeChild(li);
        }
    }
}