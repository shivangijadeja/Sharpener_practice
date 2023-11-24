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
            'expense_amount':input_value,
            'expense_description':des_val,
            'expense_category':category_val
        }
        expenses.push(expense)

        if(document.querySelector('.btn-submit').classList.contains('update-expense')){
            document.querySelector('.btn-submit').className='btn btn-dark btn-submit'
            const sel_des=document.querySelector('.btn-submit').getAttribute('selected_expense')
            axios.get("http://localhost:3000/display-expense/")
            .then((res)=>{
                for(var i=0;i<res.data.expenses.length;i++){
                    if(res.data.expenses[i]['description']===sel_des){
                        id=res.data.expenses[i]['id']
                    }
                }
            }).then(()=>{
                axios.put(`http://localhost:3000/update-expense/${id}`,expense)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            })

        }
        else{
            axios.post('http://localhost:3000/add-expense',expense)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
        }
        
        document.querySelector('#amount').value=''
        document.querySelector('#description').value=''
        document.querySelector('#category').value='travelling'
    }
}

window.onload = (event) => {
    axios.get("http://localhost:3000/display-expense")
    .then((res)=>{
        for(var i=0;i<res.data.expenses.length;i++){
            showexpenses(res.data.expenses[i])
        }
    })
    .catch((err)=>{console.log(err)})
};

function showexpenses(expense){
    var amount=expense['amount']
    var des=expense['description']
    var ex_category=expense['expense_category']

    var create_item=document.createElement('li')
    create_item.className='list-group-item'
    var display_text=String(amount).concat("-",des,"-",ex_category)
    var item_text=document.createTextNode(display_text)
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

}

function remove_expense(e){
    var li=e.target.parentElement;
    var selected_amt=li.innerText.split('-')[0];
    var selected_des=li.innerText.split('-')[1];
    var selected_category=li.innerText.split('-')[2].split('\n')[0];
    var id=0
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            item_list.removeChild(li);
            axios.get("http://localhost:3000/display-expense/")
            .then((res)=>{
                for(var i=0;i<res.data.expenses.length;i++){
                    if(res.data.expenses[i]['description']===selected_des){
                        id=res.data.expenses[i]['id']
                    }
                }
            }).then(()=>{
                axios.delete(`http://localhost:3000/delete-expense/${id}`)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }
            )
        }
    }
    if(e.target.classList.contains('edit')){
        document.querySelector('#amount').value=selected_amt;
        document.querySelector('#description').value=selected_des;
        document.querySelector('#category').value=selected_category;
        document.querySelector('.btn-submit').className='btn btn-dark btn-submit update-expense'
        document.querySelector('.btn-submit').setAttribute('selected_expense',selected_des)
        item_list.removeChild(li);
    }
}