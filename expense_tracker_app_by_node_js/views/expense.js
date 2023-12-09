var my_form=document.querySelector('#addForm');
var item_list=document.getElementById('expense_list');
var leader_board_list=document.getElementById('leaderBoard_list');
let historyplaceholder=document.querySelector('#historyplaceholder')

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

window.addEventListener("DOMContentLoaded" , ()=>{
    const objUrlParams = new URLSearchParams(Window.location);
    const page = objUrlParams.get('page') || 1;

    const entries = localStorage.getItem('numofentries');

    if(entries){
        document.getElementById('formControlRange').value = entries;
        document.getElementById('showEntries').innerHTML = entries;
    }

    const token=localStorage.getItem('token')
    const decoded_token=parseJwt(token)
    const is_premium_user=decoded_token.is_premium_user
    if(is_premium_user==1){
        showPremiumMessage()
    }
    getAllExpanses(token,page);
    
})

async function getAllExpanses(token,page){
    try{
        let entries = localStorage.getItem('numofentries');
        if(!entries){
            entries = 5;
        }
        entries = parseInt(entries);
        const res= await axios.get(`http://localhost:8000/expense/display-expense?page=${page}&entries=${entries}`,
        {headers:{'Authorization':token}})
        for(var i=0;i<res.data.expenses[0].length;i++){
            showexpenses(res.data.expenses[0][i])
        }
        showPagination(res.data)


    }
    catch(err){
        console.log(err)
    }
}

function showPagination({
    currentPage, hasNextPage , nextPage , hasPreviousPage , previousPage , lastPage
})
{
    pagination.innerHTML =''

    if(hasPreviousPage){
        const btn2 = document.createElement('button');
        btn2.innerHTML = previousPage;
        btn2.classList='pagination_btn'
        btn2.style='height:60%; width:3%; background-color: #FFFFFF; color:black'
        btn2.addEventListener('click',()=>getPaginated(previousPage));
        pagination.appendChild(btn2);
    }

    const btn1 = document.createElement('button');
    btn1.innerHTML = `<h3>${currentPage}</h3>`;
    btn1.classList='pagination_btn'
    btn1.style='height:60%; width:3%; background-color: #FFFFFF; color:black'
    btn1.addEventListener('click',()=>getPaginated(currentPage));
    pagination.appendChild(btn1);

    if(hasNextPage){
        const btn3 = document.createElement('button');
        btn3.classList='pagination_btn'
        btn3.style='height:60%; width:3%; background-color: #FFFFFF; color:black;'
        btn3.innerHTML = nextPage;
        btn3.addEventListener('click',()=>getPaginated(nextPage));
        pagination.appendChild(btn3);
    }

}


async function getPaginated(page){
    try{
        const token = localStorage.getItem('token');
        let entries = localStorage.getItem('numofentries');
        if(!entries){
            entries = 10;
        }
        entries = parseInt(entries);
        let res = await axios.get(`http://localhost:8000/expense/display-expense?page=${page}&entries=${entries}` ,
        { headers :{"Authorization":token}});
        item_list.innerHTML = "";
        for(var i=0;i<res.data.expenses[0].length;i++){
            showexpenses(res.data.expenses[0][i])
        }
        showPagination(res.data)
    }
    catch(err){
        console.log(err);
    }
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showPremiumMessage(){
    document.querySelector('#rzp-button').classList="invisible"
    document.querySelector('.premium_text').classList="float-right premium_text"
    document.querySelector('.leaderboard').classList='leaderboard float-left'
    document.querySelector('#download_expenses').classList=""
}

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
    btn_del.className='btn btn-danger btn-sm float-right delete mr-1';
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
                axios.delete(`http://localhost:8000/expense/delete-expense/${id}`,{headers:{'Authorization':token,'amount':selected_amt}})
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
        "order_id":response.data.order.id,
        "handler":async function(response){
            await axios.post('http://localhost:8000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,               
            },{headers:{'Authorization':token,'is_premium_user':true}})
            showPremiumMessage()

            alert('You are premium user now!!!')
        }
    }
    const rzp1=new Razorpay(options)
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function(response){
        console.log(response)
        alert('something went wrong')
    })
}


document.querySelector('.leaderboard').onclick=()=>{
    axios.get("http://localhost:8000/expense/show-leaderboard").then((res)=>{
        var text=document.createElement('h4')
        const item_text=document.createTextNode("Leader board")
        text.style='text-align:center'
        text.appendChild(item_text)
        leader_board_list.appendChild(text)
        for(let i=0;i<res.data.expenses[0].length;i++){
            show_leaderboard(res.data.expenses[0][i])
        }
    }).catch((err)=>{
        console.log(err)
    })
}

function show_leaderboard(expense){
    let user_name=expense.user_name
    var total_expense=expense.total_expense

    var create_item=document.createElement('li')
    
    create_item.className='list-group-item'
    var display_text=String('').concat(" Name:",user_name," Total Expense:",total_expense)
    var item_text=document.createTextNode(display_text)
    create_item.appendChild(item_text);   

    leader_board_list.appendChild(create_item)
}

document.getElementById("download_expenses").addEventListener("click", async function(){
    try{
        const token=localStorage.getItem('token')
        const response=await axios.get("http://localhost:8000/expense/download",
        {headers:{'Authorization':token}})
        const downloaded_history=await axios.get("http://localhost:8000/expense/get-history-data",
        {headers:{'Authorization':token}})
        console.log(response['data'])
        showDownloadhistory(response['data']);
    }
    catch (error) 
    {
    console.log(error);
    alert(error.response.data.message);
    } 
});

function showDownloadhistory(data) { 
    const date = new Date().toLocaleString();
    const a = document.createElement('a');
    a.className = "list-group-item text-nowrap";
    a.href = `${data['URL']}`
    a.innerHTML = `my_expense ${date}.txt`;
    historyplaceholder.removeChild(historyplaceholder.firstElementChild);
    historyplaceholder.appendChild(a);
}
    
document.getElementById('formControlRange').oninput =(e)=>{
    e.preventDefault()
    const numOfEntries = document.getElementById('formControlRange').value;
    document.getElementById('showEntries').innerHTML = numOfEntries;
    localStorage.setItem('numofentries',numOfEntries);
    const token = localStorage.getItem('token');
    item_list.innerHTML = ''
    getAllExpanses(token,1);
    console.log(localStorage.getItem('numofentries'))
}