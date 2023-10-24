var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('items');
var filter=document.getElementById('filter');

my_form.addEventListener('submit',additem);

item_list.addEventListener('click',removeitem);

filter.addEventListener('keyup',searchitem);

function additem(e){
    if(document.querySelector('#description').value==='' || document.querySelector('#item').value===''){
        alert("Provide proper values to submit.....");
    }
    else{
        e.preventDefault();

        var input_value=document.querySelector('#item').value;
        var des_val=document.querySelector('#description').value;
        var create_item=document.createElement('li')
        create_item.className='list-group-item'
        var item_text=document.createTextNode(input_value.concat(" ", des_val))
        create_item.appendChild(item_text);
        
        var btn_del=document.createElement('button');
        btn_del.className='btn btn-danger btn-sm float-right delete';
        var btn_text=document.createTextNode('X');
        btn_del.appendChild(btn_text)
        create_item.appendChild(btn_del)

        var btn_edit=document.createElement('button');
        btn_edit.className='btn btn-info float-right'
        var btn_edit_text=document.createTextNode('EDIT');
        btn_edit.appendChild(btn_edit_text);
        create_item.appendChild(btn_edit)

        item_list.appendChild(create_item);

        document.querySelector('#item').value=''
        document.querySelector('#description').value=''
    }
    
}

function removeitem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            item_list.removeChild(li);
        }
    }
}

function searchitem(e){
    inserted_val=filter.value.toLowerCase();
    var lis=item_list.getElementsByTagName('li');
    Array.from(lis).forEach(function(item){
        item_val=item.firstChild.textContent;
        if(item_val.toLowerCase().indexOf(inserted_val)!=-1){
            item.style.display='block'
        }
        else{
            item.style.display='none'
        }
    })
}