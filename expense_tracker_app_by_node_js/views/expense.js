var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('expense_list');

my_form.addEventListener('submit',addexpense);

item_list.addEventListener('click',remove_expense);

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
    const token=localStorage.getItem('token')

    var expense={
        'amount':input_value,
        'description':des_val,
        'category':category_val
    }

    axios.post('http://localhost:8000/expense/add-expense',expense,{headers:{'Authorization':token}})
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))

}

window.onload = (event) => {
    const token=localStorage.getItem('token')
    axios.get("http://localhost:8000/expense/display-expense",{headers:{'Authorization':token}})
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

function remove_expense(e){
    var li=e.target.parentElement;
    var selected_amt=li.innerText.split('==>')[0];
    var selected_des=li.innerText.split('==>')[1];
    var selected_category=li.innerText.split('==>')[2].split('\n')[0];
    var id=0
    const token=localStorage.getItem('token')
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            console.log(selected_amt,selected_des,selected_category)
            item_list.removeChild(li);
            axios.get("http://localhost:8000/expense/display-expense",{headers:{'Authorization':token}})
            .then((res)=>{
                for(var i=0;i<res.data.expenses[0].length;i++){
                    if(res.data.expenses[0][i]['description']===selected_des &&
                    res.data.expenses[0][i]['amount']==selected_amt && 
                    res.data.expenses[0][i]['category']===selected_category){
                        id=res.data.expenses[0][i]['id']
                    }
                }
            })
            .then(()=>{
                axios.delete(`http://localhost:8000/expense/delete-expense/${id}`)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }
            )
        }
    }
}

document.getElementById('rzp-button').onclick= async function(e){
    const token=localStorage.getItem('token')
    const response=await axios.get('http://localhost:8000/purchase/premiummembership',
    {headers:{'Authorization':token}})
    var options={
        "key":response.data.key_id,
        "order_id":response.data.order_id,
        "header":async function(response){
            await axios.post('http://localhost:8000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,               
            },{headers:{'Authorization':token}})

            alert('You are premium user now!!!')
        }
    }
}