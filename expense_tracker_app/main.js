var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('expense_list');

var expenses=[]

my_form.addEventListener('submit',addexpense);

item_list.addEventListener('click',remove_expense);

function addexpense(e){
    if(document.querySelector('#description').value==='' || document.querySelector('#amount').value===''){
        alert("Provide proper values to submit.....");
    }
    else{
        e.preventDefault();
        var input_value=document.querySelector('#amount').value;
        var des_val=document.querySelector('#description').value;
        var category_val=document.querySelector('#category').value;
        var create_item=document.createElement('li')
        create_item.className='list-group-item'
        var item_text=document.createTextNode(input_value.concat(" ", des_val, ' ', category_val))
        create_item.appendChild(item_text);

        var btn_del=document.createElement('button');
        btn_del.className='btn btn-danger btn-sm float-right delete mr-2';
        var btn_text=document.createTextNode('DELETE');
        btn_del.appendChild(btn_text)
        create_item.appendChild(btn_del)

        var btn_edit=document.createElement('button');
        btn_edit.className='btn btn-info btn-sm float-right mr-2 edit'
        var btn_edit_text=document.createTextNode('EDIT');
        btn_edit.appendChild(btn_edit_text);
        create_item.appendChild(btn_edit)

        item_list.appendChild(create_item);

        var expense={
            'Expense Amount':input_value,
            'Expense Description':des_val,
            'Expense Category':category_val
        }
        expenses.push(expense)
        store_expense_item(expenses);

        document.querySelector('#amount').value=''
        document.querySelector('#description').value=''
        document.querySelector('#category').value=''
    }
}

function store_expense_item(expenses) {
    for(var i=0;i<expenses.length;i++){
        serialize_data=JSON.stringify(expenses[i])
        deserialize_data=JSON.parse(serialize_data)
        localStorage.setItem(deserialize_data['Expense Description'], serialize_data )   
    }
}

function remove_expense(e){
    var li=e.target.parentElement;
    var selected_amt=li.innerText.split(' ')[0];
    var selected_des=li.innerText.split(' ')[1];
    var selected_category=li.innerText.split(' ')[2];
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            item_list.removeChild(li);
            localStorage.removeItem(selected_des);
        }
    }
    if(e.target.classList.contains('edit')){
        document.querySelector('#amount').value=selected_amt;
        document.querySelector('#description').value=selected_des;
        document.querySelector('#category').value=selected_category;
        localStorage.removeItem(selected_des);
        item_list.removeChild(li);
    }
}