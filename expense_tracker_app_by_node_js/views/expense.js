var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('expense_list');

my_form.addEventListener('submit',addexpense);

function addexpense(e){
    e.preventDefault();
    var input_value=document.querySelector('.amount').value;
    var des_val=document.querySelector('.des').value;
    var category_val=document.querySelector('#category').value;

    var create_item=document.createElement('li')
    create_item.className='list-group-item'
    var item_text=document.createTextNode(input_value.concat("==>", des_val, '==>', category_val))
    create_item.appendChild(item_text);

    var btn_del=document.createElement('button');
    btn_del.className='btn btn-danger btn-sm float-right delete mr-2';
    var btn_text=document.createTextNode('DELETE');
    btn_del.appendChild(btn_text)
    create_item.appendChild(btn_del)

    item_list.appendChild(create_item);

    var expense={
        'amount':input_value,
        'description':des_val,
        'category':category_val
    }

    axios.post('http://localhost:8000/expense/add-expense',expense)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))

}

window.onload = (event) => {
    axios.get("http://localhost:8000/expense/display-expense")
    .then((res)=>{
        for(var i=0;i<res.data.expenses[0].length;i++){
            showexpenses(res.data.expenses[0][i])
        }
    })
    .catch((err)=>{console.log(err)})
};

function showexpenses(expense){
    var amount=expense['amount']
    var des=expense['description']
    var ex_category=expense['category']

    var create_item=document.createElement('li')
    create_item.className='list-group-item'
    var display_text=String(amount).concat("==>",des,"==>",ex_category)
    var item_text=document.createTextNode(display_text)
    create_item.appendChild(item_text);

    var btn_del=document.createElement('button');
    btn_del.className='btn btn-danger btn-sm float-right delete mr-2';
    var btn_text=document.createTextNode('DELETE');
    btn_del.appendChild(btn_text)
    create_item.appendChild(btn_del)

    item_list.appendChild(create_item);

}